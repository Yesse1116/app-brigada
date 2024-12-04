import React from 'react';

const Usuarios = ({ usuarios, cambiarRol }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Rol Actual</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(usuario => (
          <tr key={usuario._id}>
            <td>{usuario.nombre}</td>
            <td>{usuario.correo}</td>
            <td>{usuario.rol}</td>
            <td>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  cambiarRol(usuario._id, e.target.nuevoRol.value);
                }}
              >
                <select name="nuevoRol" defaultValue={usuario.rol}>
                  <option value="normal">Usuario</option>
                  <option value="administrador">Administrador</option>
                </select>
                <button type="submit">Cambiar</button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Usuarios;
