import { NextRequest, NextResponse } from 'next/server';
import { getProvider } from '@/lib/providers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const provider = getProvider();
    const comps = await provider.getComparables(id);

    return NextResponse.json({ comps });
  } catch (error) {
    console.error('Comps error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comparables' },
      { status: 500 }
    );
  }
}
