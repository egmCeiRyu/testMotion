import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    "https://vwlevkuhenymqrlhlwdf.supabase.co",
    "SUA_CHAVE"
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
        console.log("AR Session criada!");
        console.log(sessionData);
    }

});