import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    "https://vwlevkuhenymqrlhlwdf.supabase.co",
    "sb_publishable_xt00-kBah5vzNhpUNsz1vw_gXzgmL9e"
);

window.addEventListener("load", async () => {

    const propertyId = "81a8e5d4-fcdf-4607-a44e-e50aea24b21b";

    const { error } = await supabase
        .from("page_views")
        .insert({
            property_id: propertyId,
            device: navigator.userAgent,
            browser: navigator.userAgent,
            os: navigator.platform
        });

    if(error){
        console.log(error);
    }else{
        console.log("Analytics enviado!");
    }

});