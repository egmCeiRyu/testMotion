import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

let sessionId = null;
const startTime = Date.now();

const supabase = createClient(
    "https://vwlevkuhenymqrlhlwdf.supabase.co",
    "sb_publishable_xt00-kBah5vzNhpUNsz1vw_gXzgmL9e"
);

window.addEventListener("load", async () => {

    const propertyId =
        new URLSearchParams(location.search).get("id");

    // Page View
    const { error } = await supabase
        .from("page_views")
        .insert({
            property_id: propertyId,
            device: navigator.userAgent,
            browser: navigator.userAgent,
            os: navigator.platform
        });

    if (error) {
        console.log(error);
    } else {
        console.log("Analytics enviado!");
    }

    // AR Session
    const sessionStart = new Date().toISOString();

    const { data: sessionData, error: sessionError } =
        await supabase
            .from("ar_sessions")
            .insert({
                property_id: propertyId,
                device: navigator.userAgent,
                browser: navigator.userAgent,
                os: navigator.platform,
                started_at: sessionStart
            })
            .select();

    if (sessionError) {
        console.log(sessionError);
    } else {
        sessionId = sessionData[0].id;
        console.log("AR Session criada:", sessionId);
    }

});

window.addEventListener("pagehide", async () => {

    if (!sessionId) return;

    const duration =
        Math.floor((Date.now() - startTime) / 1000);

    const { error } = await supabase
        .from("ar_sessions")
        .update({
            ended_at: new Date().toISOString(),
            duration: duration
        })
        .eq("id", sessionId);

    if (error) {
        console.log(error);
    } else {
        console.log("Sessão finalizada");
    }

});