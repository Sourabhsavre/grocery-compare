import { createClient } from './supabase/client';

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: number;
  product_name: string;
  product_image: string;
  min_price: number;
  platform: string;
  created_at: string;
}

export async function addToWishlist(userId: string, product: any, stats: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('wishlists')
    .insert({
      user_id: userId,
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      min_price: stats.min,
      platform: stats.cheapestPlatform || 'Unknown',
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data as WishlistItem;
}

export async function removeFromWishlist(userId: string, productId: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .match({ user_id: userId, product_id: productId });

  if (error) {
    throw error;
  }
  return true;
}

export async function getWishlist(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('wishlists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data as WishlistItem[];
}
