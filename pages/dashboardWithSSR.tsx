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
  console.log({cookies})

  // Ejemplo de cómo leer una cookie específica
  const myTokenName = cookies.myTokenName || '';

  // Puedes usar el token para hacer una petición a una API externa
  const response = await fetch('https://e8c30645-ebd9-421d-ab33-63cf66486e41-00-pd5nzarbr2b8.worf.replit.dev/api/profile',{
    headers: {
      //'Authorization': `Bearer ${token}`,
      'Cookie': `token=${myTokenName}`,
    },
  });

  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}