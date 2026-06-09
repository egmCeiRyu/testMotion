import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    "https://vwlevkuhenymqrlhlwdf.supabase.co",
    "sb_publishable_xt00-kBah5vzNhpUNsz1vw_gXzgmL9e"
);

async function loadDashboard(){

    const { data } = await supabase
        .from("page_views")
        .select("*")
        .order("created_at",{ascending:false});

    document.getElementById("totalViews").innerText =
        data.length;

    const today = new Date().toISOString().slice(0,10);

    const todayCount =
        data.filter(x=>x.created_at.startsWith(today)).length;

    document.getElementById("todayViews").innerText =
        todayCount;

    const tbody =
        document.getElementById("tableBody");

    tbody.innerHTML="";

    data.slice(0,20).forEach(x=>{

        tbody.innerHTML +=

        `
        <tr>

        <td>${new Date(x.created_at).toLocaleString()}</td>

        <td>${x.os}</td>

        <td>${x.browser}</td>

        </tr>
        `;

    });

}

loadDashboard();