import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import GroceryApp from '@/components/GroceryApp'
import { groceryData } from '@/data/groceryData'

export default async function Page() {
  const cookieStore = await cookies()
  let finalProducts = groceryData;

  try {
    const supabase = createClient(cookieStore)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false, nullsFirst: false });
      
      if (products && products.length > 0) {
        finalProducts = products;
      }
    }
  } catch (error) {
    console.error("Error fetching products from Supabase:", error);
  }

  return <GroceryApp products={finalProducts} />
}
