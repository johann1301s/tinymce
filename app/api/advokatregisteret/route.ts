import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    console.log(req.body)
    const apiUrl = [
      'https://api.data.altinn.no/v1/directharvest/AdvRegPersonVerifikasjon/?subject=13019236913&envelope=false',
      'https://api.data.altinn.no/v1/directharvest/AdvokatverifikasjonPrivat/?subject=13019236913&envelope=false'
    ][1]

    const token = '';
    const subscriptionKey = process.env.ADVOKATREGISTERET_PRIMARY_KEY;

    const response = await axios.get(`${apiUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    });

    console.log('response: ', response)

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching external API:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};