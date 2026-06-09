import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    "https://vwlevkuhenymqrlhlwdf.supabase.co",
    "sb_publishable_xt00-kBah5vzNhpUNsz1vw_gXzgmL9e"
);

function getBrowser(ua){

ua=ua.toLowerCase();

if(ua.includes("edg")) return "Edge";

if(ua.includes("chrome")) return "Chrome";

if(ua.includes("safari")&&!ua.includes("chrome")) return "Safari";

if(ua.includes("firefox")) return "Firefox";

return "Other";

}

function getDevice(os,browser){

const ua=browser.toLowerCase();

if(ua.includes("iphone")) return "📱 iPhone";

if(ua.includes("ipad")) return "📱 iPad";

if(ua.includes("android")) return "🤖 Android";

if(os.includes("Win")) return "💻 Windows";

if(os.includes("Mac")) return "🍎 Mac";

return "💻 Other";

}

async function loadDashboard(){

const {data}=await supabase

.from("page_views")

.select("*")

.order("created_at",{ascending:false});

document.getElementById("totalViews").innerText=data.length;

const today=new Date().toISOString().slice(0,10);

document.getElementById("todayViews").innerText=

data.filter(x=>x.created_at.startsWith(today)).length;


const tbody=document.getElementById("tableBody");

tbody.innerHTML="";

data.slice(0,30).forEach(x=>{

tbody.innerHTML+=`

<tr>

<td>

${new Date(x.created_at).toLocaleString(

"ja-JP",

{timeZone:"Asia/Tokyo"}

)}

</td>

<td>

${getDevice(x.os,x.browser)}

</td>

<td>

${getBrowser(x.browser)}

</td>

</tr>

`;

});

}

loadDashboard();