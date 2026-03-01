const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, projectType, message } = await req.json();

    if (!firstName || !lastName || !email || !projectType || !message) {
      return new Response(JSON.stringify({ error: 'Tous les champs sont requis.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Service email non configuré.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const projectLabels: Record<string, string> = {
      web: 'Conception de site web',
      graphic: 'Design graphique',
      uiux: 'UI/UX Design',
      branding: 'Identité de marque',
      other: 'Autre',
    };

    const htmlBody = `
      <div style="font-family:'DM Sans',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#060810;color:#EAE5D9;padding:32px;border-radius:12px;">
        <h1 style="font-family:'Syne',sans-serif;color:#F5A623;font-size:24px;margin-bottom:24px;">Nouveau message de contact</h1>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#F5A623;font-weight:600;">Prénom</td><td style="padding:8px 0;">${firstName}</td></tr>
          <tr><td style="padding:8px 0;color:#F5A623;font-weight:600;">Nom</td><td style="padding:8px 0;">${lastName}</td></tr>
          <tr><td style="padding:8px 0;color:#F5A623;font-weight:600;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#F5A623;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#F5A623;font-weight:600;">Type de projet</td><td style="padding:8px 0;">${projectLabels[projectType] || projectType}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:rgba(245,166,35,0.08);border-radius:8px;border:1px solid rgba(245,166,35,0.2);">
          <p style="color:#F5A623;font-weight:600;margin:0 0 8px;">Message :</p>
          <p style="margin:0;line-height:1.6;white-space:pre-wrap;">${message}</p>
        </div>
        <p style="margin-top:24px;font-size:12px;color:rgba(234,229,217,0.5);">Envoyé depuis le formulaire de contact — mbutheudesign.com</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'MBUTHEU DESIGN <onboarding@resend.dev>',
        to: ['contact@mbutheudesign.com'],
        subject: `Nouveau message de ${firstName} ${lastName} — ${projectLabels[projectType] || projectType}`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return new Response(JSON.stringify({ error: "Échec de l'envoi de l'email." }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
