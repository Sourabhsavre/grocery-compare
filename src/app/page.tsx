import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import GroceryApp from '@/components/GroceryApp'
import { groceryData } from '@/data/groceryData'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Fetch products from Supabase
  const { data: products, error } = await supabase.from('products').select('*')
  
  // Fallback to local data if Supabase isn't seeded yet
  const finalProducts = (products && products.length > 0) ? products : groceryData;

  return <GroceryApp products={finalProducts} />
}
