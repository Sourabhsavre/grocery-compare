import fs from 'fs';
import { groceryData } from './src/data/groceryData.ts';

let sql = `CREATE TABLE IF NOT EXISTS public.products (
  id integer PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  image text,
  prices jsonb NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products" 
ON public.products FOR SELECT 
USING (true);

INSERT INTO public.products (id, name, category, image, prices) VALUES
`;

const values = groceryData.map(item => {
  const name = item.name.replace(/'/g, "''");
  return `(${item.id}, '${name}', '${item.category}', '${item.image}', '${JSON.stringify(item.prices)}'::jsonb)`;
}).join(",\n");

sql += values + ";\n";

fs.mkdirSync('./supabase', { recursive: true });
fs.writeFileSync('./supabase/setup.sql', sql);
console.log("SQL generated at supabase/setup.sql");
