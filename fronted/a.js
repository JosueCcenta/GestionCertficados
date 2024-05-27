<table>
<thead>
    <tr>
        <th>Hola</th>
        <th>Dni</th>
        <th>Nombre</th>
    </tr>
</thead>
<tbody>
    {Data.map((item, index) => (
        <tr key={index}>
            <td>{item.hola}</td>
            <td>{item.dni}</td>
            <td>{item.nombre}</td>
        </tr>
    ))}
</tbody>
</table>