
import MemeDisplay from '@/components/MemeDisplay';
import templates from '@/data/memeTemplates';
import database from '@/data/database';
import MemeEditor from '@/components/MemeEditor';



export default function Home() {
  return (
   <main className="max-w-[1200px] mx-auto overflow-y-auto">
    <MemeEditor templates={templates} />
    <h2 className="text-3xl font-bold mt-5 text-white">Memes</h2>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
      {database.map((meme) => (
        <div key={meme.id}>

    {/* @ts-ignore  */}
    <MemeDisplay 
     {...templates.find((template) => template.id === meme.template)!}
     values={meme.values}
      />
      </div>
      ))}


    
      </div>

   </main>
  )
}
