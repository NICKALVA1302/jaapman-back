import e, { Request, Response } from 'express';
import { login } from '../models/login';
import Usuarios from '../models/usuarios';
import { UsuarioRolAttributes, usuario_rol } from '../models/usuario_rol';

import bcrypt from 'bcrypt';
import Personas from '../models/personas';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { rol } from '../models/rol';
import db from '../db/connection';
import { QueryTypes } from 'sequelize';

export const loginUser = async (req: Request, res: Response) => {
const { usuario, clave } = req.body;

try {
    const loginAux: any = await login.findOne({ where: { usuario: usuario } });

    if (!loginAux) {
        return res.status(400).json({
            msg: `No existe un usuario con la cédula ${usuario} en la base de datos`
        });
    }

    const passwordValid = await bcrypt.compare(clave, loginAux.clave);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Clave incorrecta`
        });
    }

    const usuarioAux: any = await Usuarios.findOne({ where: { id_login: loginAux.id_login } });



    if (!usuarioAux) {
        return res.status(400).json({
            msg: `No se encontró un usuario asociado a este login`
        });
    }

    if (usuarioAux.id_estado !== 1) {
        return res.status(400).json({
            msg: `Acceso no autorizado. Usuario aún no verificado.`
        });
    }
    const rolesAux: any[] = await usuario_rol.findAll({ where: { id_usuario: usuarioAux.id_usuario } });

    const id_rol_usuario = rolesAux.map((rol) => rol.id_usuario_rol);

    const responseData = {
    msg: 'Inicio de sesión exitoso, Eliga un Rol.',
    
        token: jwt.sign({
            usuario: usuarioAux.usuario,
        }, process.env.SECRET_KEY || 'manglaraltopda-alvarez'),
        id_usuario: usuarioAux.id_usuario,
        id_rol: rolesAux.map((rol: { id_rol: any; }) => rol.id_rol),
        id_rol_usuario: id_rol_usuario
        };

    res.json(responseData);
    console.log(responseData)
} catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
}
};

export const nuevoUsuario = async (req: Request, res: Response) => {
const { nombre, apellido, cedula, direccion, telefono, genero, email, clave, id_localidad } = req.body;

console.log(id_localidad);

const hashedPassword = await bcrypt.hash(clave, 10);
try {
    await Personas.create({
        nombre: nombre,
        apellido: apellido,
        cedula: cedula,
        direccion: direccion,
        telefono: telefono,
        genero: genero,
        email: email
    });

    try {
        const ultimaPersona = await Personas.findOne({
            attributes: ['id_persona'],
            order: [['createdAt', 'DESC']]
        });
        console.log(ultimaPersona);
        const idPersona = ultimaPersona ? (ultimaPersona as any).getDataValue('id_persona') + 0 : 0;
        const randomToken = uuidv4();
        await login.create({
            usuario: cedula,
            clave: hashedPassword,
            token: randomToken,
        });

        try {
            const ultimoLogin = await login.findOne({
                attributes: ['id_login'],
                order: [['createdAt', 'DESC']]
            });
            console.log(ultimoLogin);
            const idLogin = ultimoLogin ? (ultimoLogin as any).getDataValue('id_login') + 0 : 0;

            const idLocalidad = id_localidad;
            await Usuarios.create({
                id_persona: idPersona,
                id_localidad: idLocalidad,
                id_estado: 2,
                id_login: idLogin,
            });

            try {
                const lastidUser = await Usuarios.findOne({
                    attributes: ['id_usuario'],
                    order: [['createdAt', 'DESC']]
                });
                console.log(lastidUser);
                const id_usuario = lastidUser ? (lastidUser as any).getDataValue('id_usuario') + 0 : 0;

                await usuario_rol.create({
                    id_usuario: id_usuario,
                    id_rol: 1
                });

                res.json({
                    msg: 'Usuario creado.'
                });
            } catch (error) {
                console.error("Error durante la creación:", error);
                res.status(500).json({
                    error: 'Hubo un error durante la creación del usuario.'
                });
            }
        } catch (error) {
            console.error("Error durante la creación:", error);
            res.status(500).json({
                error: 'Hubo un error durante la creación del usuario.'
            });
        }
    } catch (error) {
        console.error("Error durante la creación:", error);
        res.status(500).json({
            error: 'Hubo un error durante la creación del usuario.'
        });
    }
} catch (error) {
    console.error("Error durante la creación:", error);
    res.status(500).json({
        error: 'Hubo un error durante la creación del usuario.'
    });
}
};

export const getIdRolUsuario = async (req: Request, res: Response) => {
    const { id_usuario, id_rol } = req.body;
    console.log(id_usuario, id_rol);

    try {
        const usuarioRol = await usuario_rol.findOne({
            where: {
                id_usuario: id_usuario,
                id_rol: id_rol,
            },
        }) as unknown as UsuarioRolAttributes | null;

        if (usuarioRol) {
            return res.json({
                success: true,
                id_usuario_rol: usuarioRol.id_usuario_rol,
            });
        } else {
            return res.json({
                success: false,
                id_usuario_rol: null,
                message: 'No se encontró un registro de usuario_rol para los valores proporcionados.',
            });
        }
    } catch (error) {
        console.error('Error al obtener el id_usuario_rol:', error);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor al buscar el id_usuario_rol',
        });
    }
};
    

export const verificarCedula = async (req: Request, res: Response) => {
const { cedula } = req.body;
console.log(cedula);
try {
    const personaExistente = await Personas.findOne({
    where: {
        cedula: cedula,
    },
    });

    if (personaExistente) {
    return res.json({
        success: true,
        cedulaExists: true,
        persona: {
        },
    });
    } else {
    return res.json({
        success: true,
        cedulaExists: false,
        persona: null,
    });
    }
} catch (error) {
    console.error('Error al verificar la cédula:', error);
    return res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    });
}
};


export const buscarToken = async (req: Request, res: Response) => {
try {
    const { usuario } = req.body;

    if (!usuario) {
    return res.status(400).json({ error: 'El parámetro usuario es requerido' });
    }

    const usuarioLogin = await login.findOne({
    attributes: ['token'],
    where: { usuario: usuario },
    order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ token: usuarioLogin ? usuarioLogin.token : null });
} catch (error) {
    console.error('Error al buscar el token:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
}
};


export const verificarUsuarioPorToken = async (req: Request, res: Response) => {
try {
    const { token } = req.query;

    if (!token) {
    return res.status(400).json({ error: 'El parámetro token es requerido' });
    }

    const loginRegistro = await login.findOne({
    where: { token: token as string },
    });

    if (loginRegistro) {
    const idLogin = loginRegistro.id_login;

    const usuarioActualizado = await Usuarios.update(
        { id_estado: 1 },
        { where: { id_login: idLogin } }
    );

    if (usuarioActualizado) {
        return res.status(200).json({ mensaje: 'Usuario verificado correctamente' });
    } else {
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
    } else {
    return res.status(404).json({ error: 'Token no encontrado en la tabla login' });
    }
} catch (error) {
    console.error('Error al verificar el usuario por token:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
}
};


export const obtenerRolesPorUsuario = async (req: Request, res: Response) => {
try {
    const { idUsuario } = req.body;

    if (!idUsuario) {
    return res.status(400).json({ error: 'El parámetro idUsuario es requerido' });
    }

    const rolesIds = await usuario_rol.findAll({
    attributes: ['id_rol'],
    where: { id_usuario: idUsuario },
    raw: true, 
    }).then((roles) => roles.map((r: any) => r.id_rol));

    const rolesNames = await rol.findAll({
    attributes: ['nombre'],
    where: { id_rol: rolesIds },
    raw: true,
    }).then((roles) => roles.map((r: any) => r.nombre));

    return res.status(200).json({ roles: rolesNames });
} catch (error) {
    console.error('Error al obtener roles:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
}
};

export const verificarCorreo = async (req: Request, res: Response) => {
const { correo } = req.body;
try {
    const personaExistente = await Personas.findOne({
    where: {
        email: correo,
    },
    });

    if (personaExistente) {
    return res.json({
        success: true,
        correoExists: true,
        persona: {
        },
    });
    } else {
    return res.json({
        success: true,
        correoExists: false,
        persona: null,
    });
    }
} catch (error) {
    console.error('Error al verificar el correo electrónico:', error);
    return res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    });
}
};


export const guardarOTP = async (req: Request, res: Response) => {
try {
    const { correo, otp } = req.body;

    if (!correo || !otp) {
    return res.status(400).json({ error: 'Correo y OTP son requeridos' });
    }

    const personaEncontrada = await Personas.findOne({ where: { email: correo } });

    if (!personaEncontrada) {
    return res.status(404).json({ error: 'No se encontró el usuario asociado al correo proporcionado' });
    }

    const idPersona = personaEncontrada.getDataValue('id_persona');

    const loginEncontrado = await Usuarios.findOne({ where: { id_persona: idPersona } });

    if (!loginEncontrado) {
    return res.status(404).json({ error: 'No se encontró el registro de Login asociado al usuario' });
    }
    const idLogin = loginEncontrado.getDataValue('id_login');

    await login.update({ otp }, { where: { id_login: idLogin } });

    return res.status(200).json({ mensaje: 'OTP guardado con éxito' });
    
} catch (error) {
    console.error('Error al guardar el OTP:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
}
};


export const verificarOTP = async (req: Request, res: Response) => {
const { otp } = req.body;

try {
    const loginEncontrado = await login.findOne({
        where: {
            otp: otp,
        },
    });

    if (loginEncontrado) {
        const idLogin = loginEncontrado.getDataValue('id_login');

        return res.json({
            success: true,
            otpExists: true,
            id_login: idLogin,
        });
    } else {
        return res.json({
            success: true,
            otpExists: false,
            id_login: null,
        });
    }
} catch (error) {
    console.error('Error al verificar el OTP', error);
    return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
    });
}
};

export const actualizarClave = async (req: Request, res: Response) => {
const { idLoginFromAuth, nuevaClave } = req.body;
try {
const hashedPassword = await bcrypt.hash(nuevaClave, 10);

const [rowsAffected] = await login.update(
    { clave: hashedPassword },
    { where: { id_login: idLoginFromAuth } }
);

if (rowsAffected > 0) {
    await login.update({ otp: null }, { where: { id_login: idLoginFromAuth } });

    return res.json({ success: true, message: 'Contraseña actualizada con éxito' });
} else {
    return res.status(400).json({ success: false, error: 'No se pudo actualizar la contraseña' });
}
} catch (error) {
console.error('Error al actualizar la contraseña:', error);
return res.status(500).json({ success: false, error: 'Error interno del servidor' });
}
};

export const changePassword = async (req: Request, res: Response) => {
    const { id_rol_usuario, id_rol, actualClave, nuevaClave } = req.body;
    try {
        
        // Se obtiene el id_login del usuario
        const obtenerIdLogin: { id_login: number }[] = await db.query(`
        select log.id_login from usuario u 
            join login log on u.id_login = log.id_login
            join usuario_rol ur on u.id_usuario = ur.id_usuario
        where ur.id_usuario_rol = :usuarioRolId and ur.id_rol = :RolId;
        `, {
            replacements: { usuarioRolId: id_rol_usuario, RolId: id_rol},
            type: QueryTypes.SELECT
        });

        //Se guarda en una variable el id_login
        const id_login = obtenerIdLogin[0].id_login;

        // Primero se busca el id_login del usuario para verificar si la clave actual es correcta
        const loginTable: any = await login.findOne({ where: { id_login: id_login } });
        const passwordValid = await bcrypt.compare(actualClave, loginTable.clave);
        if (passwordValid) {
            // Si es correcta, se actualiza la clave
            const hashedPassword = await bcrypt.hash(nuevaClave, 10);
            await loginTable.update(
                { clave: hashedPassword }
            );
            res.status(200).json({ msg: 'Contraseña actualizada correctamente' });
        } else {
            res.status(400).json({ msg: 'La contraseña actual es incorrecta' });
        }
    } catch (error) {
    return res.status(500).json({error: 'Error interno del servidor' });
    }

}