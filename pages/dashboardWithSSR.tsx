import { parse } from 'cookie';

const DasbhboardWithSSRPage=({data})=>{
  console.log({data})
  return(
    <section>DasbhboardWithSSRPage</section>
  )
}

export default DasbhboardWithSSRPage;

export async function getServerSideProps(context) {
  // Acceder a las cookies desde el contexto del request
  const { req } = context;
  const cookies = parse(req.headers.cookie || '');
  console.log({cookies});
  // Ejemplo de cómo leer una cookie específica
  const myTokenName = cookies.myTokenName || '';

  // Puedes usar el token para hacer una petición a una API externa
  const response = await fetch('http://localhost:3000/api/profile',{
    headers: {
      //'Authorization': `Bearer ${token}`,
      'Cookie': `myTokenName=${myTokenName}`,
    },
  });

  const data = await response.json();

  return {
    props: {
      data
    },
  };
}