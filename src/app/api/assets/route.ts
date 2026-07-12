import { NextResponse } from 'next/server';
import { AssetService } from '@/server/services/AssetService';

export async function GET() {
  try {
    const assets = await AssetService.getAllAssets();
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const asset = await AssetService.createAsset(body);
    return NextResponse.json(asset, { status: 201 });
  } catch (error: any) {
    console.error('Error creating asset:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
