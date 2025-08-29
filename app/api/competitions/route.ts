import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Competition } from '@/lib/models/Competition';
import { Player } from '@/lib/models/Player';

export async function GET() {
  try {
    await dbConnect();

    const competitions = await Competition.find({})
      .select('slug name status votePrice startDate endDate description')
      .sort({ status: 1, startDate: -1 });

    // Enrichir avec les stats
    const competitionsWithStats = await Promise.all(
      competitions.map(async (competition) => {
        const playersCount = await Player.countDocuments({ 
          competitionId: competition._id 
        });
        
        const totalVotesResult = await Player.aggregate([
          { $match: { competitionId: competition._id } },
          { $group: { _id: null, total: { $sum: '$votesConfirmed' } } }
        ]);
        
        const totalVotes = totalVotesResult[0]?.total || 0;

        return {
          ...competition.toObject(),
          playersCount,
          totalVotes
        };
      })
    );

    return NextResponse.json(competitionsWithStats);
    
  } catch (error) {
    console.error('Erreur récupération compétitions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}