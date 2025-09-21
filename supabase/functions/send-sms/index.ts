import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SMSRequest {
  phoneNumber: string;
  busData: {
    routeNumber: string;
    busNumber: string;
    city: string;
    route: string;
    currentStop: string;
    nextStops: string[];
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accountSid = 'AC0b9c5d05d1dcc2d00b2ae3d60357f9c4';
    const authToken = '02a793a1db44bc0ac1c33d2a2cd6d30d';

    const { phoneNumber, busData }: SMSRequest = await req.json();

    if (!phoneNumber || !busData) {
      throw new Error('Phone number and bus data are required');
    }

    // Format phone number to ensure it has country code
    let formattedPhoneNumber = phoneNumber.trim();
    
    // If phone number doesn't start with +, assume it's an Indian number and add +91
    if (!formattedPhoneNumber.startsWith('+')) {
      // Remove any leading 0 if present
      if (formattedPhoneNumber.startsWith('0')) {
        formattedPhoneNumber = formattedPhoneNumber.substring(1);
      }
      formattedPhoneNumber = '+91' + formattedPhoneNumber;
    }

    console.log('Formatted phone number:', formattedPhoneNumber);

    // Format the SMS message
    const message = `🚌 NavGati Bus Location Update

📍 Bus: ${busData.busNumber}
🛣️ Route: ${busData.routeNumber} - ${busData.route}
🏙️ City: ${busData.city}
📌 Current Location: ${busData.currentStop}
🗺️ Coordinates: ${busData.coordinates.lat}, ${busData.coordinates.lng}

🚏 Upcoming Stops:
${busData.nextStops.slice(0, 3).map((stop, index) => `${index + 1}. ${stop}`).join('\n')}

Track your bus with NavGati! 🚍`;

    // Send SMS using Twilio API
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: '+15005550006', // Twilio test number
          To: formattedPhoneNumber,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Twilio API error:', errorData);
      throw new Error(`Failed to send SMS: ${response.status} - ${errorData}`);
    }

    const result = await response.json();
    console.log('SMS sent successfully:', result.sid);

    return new Response(JSON.stringify({ 
      success: true, 
      messageSid: result.sid,
      message: 'SMS sent successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('Error in send-sms function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);