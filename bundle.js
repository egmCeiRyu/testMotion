AFRAME.registerComponent("tap-place", {

  init: function () {

    const ground = document.getElementById("ground");
    const model = document.getElementById("model");
    const promptText = document.getElementById("promptText");

    // =========================
    // UI
    // =========================

    const ui = document.createElement("div");

    ui.innerHTML = `
    
    <div style="
      position:fixed;
      bottom:24px;
      left:50%;
      transform:translateX(-50%);
      z-index:999;
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:10px;
      pointer-events:auto;
    ">

      <div id="scaleLabel" style="
        color:white;
        font-size:20px;
        font-family:Arial;
        font-weight:bold;
        text-shadow:0 0 6px black;
      ">
        Size: 30%
      </div>

      <div id="colorMenu" style="
        display:flex;
        gap:10px;
        padding:10px 14px;
        background:rgba(0,0,0,0.35);
        border-radius:36px;
        backdrop-filter:blur(8px);
      ">

        <!-- Creme -->
        <button 
          data-color="#d9d2c3"
          style="
            width:46px;
            height:46px;
            border-radius:50%;
            border:3px solid white;
            background:#d9d2c3;
          ">
        </button>

        <!-- Bege -->
        <button 
          data-color="#bfa58a"
          style="
            width:46px;
            height:46px;
            border-radius:50%;
            border:3px solid white;
            background:#bfa58a;
          ">
        </button>

        <!-- Marrom claro -->
        <button 
          data-color="#8b6f5a"
          style="
            width:46px;
            height:46px;
            border-radius:50%;
            border:3px solid white;
            background:#8b6f5a;
          ">
        </button>

        <!-- Marrom escuro -->
        <button 
          data-color="#5c4435"
          style="
            width:46px;
            height:46px;
            border-radius:50%;
            border:3px solid white;
            background:#5c4435;
          ">
        </button>

        <!-- Preto -->
        <button 
          data-color="#2f241d"
          style="
            width:46px;
            height:46px;
            border-radius:50%;
            border:3px solid white;
            background:#2f241d;
          ">
        </button>

      </div>

    </div>
    `;

    document.body.appendChild(ui);

    const scaleLabel = document.getElementById("scaleLabel");

    // =========================
    // PINCH TO SCALE
    // =========================

    let initialDistance = 0;
    let initialScale = 0;

    function getTouchDistance(touch1, touch2) {

      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;

      return Math.sqrt(dx * dx + dy * dy);
    }

    window.addEventListener("touchstart", function (e) {

      if (e.touches.length === 2) {

        initialDistance = getTouchDistance(
          e.touches[0],
          e.touches[1]
        );

        initialScale = model.object3D.scale.x;
      }

    }, { passive: false });

    window.addEventListener("touchmove", function (e) {

      if (e.touches.length === 2) {

        e.preventDefault();

        const currentDistance = getTouchDistance(
          e.touches[0],
          e.touches[1]
        );

        let scaleFactor = currentDistance / initialDistance;

        let newScale = initialScale * scaleFactor;

        // minimo 30%
        newScale = Math.max(0.9, newScale);

        // maximo 100%
        newScale = Math.max(0.3, newScale);

        model.object3D.scale.set(
          newScale,
          newScale,
          newScale
        );
      }

    }, { passive: false });

    // =========================
    // TAP TO PLACE
    // =========================

    ground.addEventListener("click", function (ev) {

      promptText.style.display = "none";

      const point = ev.detail.intersection.point;

      model.setAttribute("visible", "true");

      model.setAttribute(
        "position",
        point.x + " " + point.y + " " + point.z
      );

      // começa pequeno
      model.object3D.scale.set(0.3, 0.3, 0.3);

    });

    // =========================
    // MATERIAIS PINTÁVEIS
    // =========================

    const paintableMaterials = [
      "Wall",
      "wall",
      "Paint",
      "paint",
      "Exterior",
      "Facade",
      "Casa"
    ];

    // =========================
    // TROCA DE COR
    // =========================

    document.querySelectorAll("#colorMenu button")
      .forEach(function (btn) {

        btn.addEventListener("click", function () {

          const selectedColor = btn.dataset.color;

          model.object3D.traverse(function (obj) {

            if (!obj.isMesh || !obj.material) {
              return;
            }

            let materials;

            if (Array.isArray(obj.material)) {
              materials = obj.material;
            } else {
              materials = [obj.material];
            }

            materials.forEach(function (mat) {

              const matName = mat.name || "";

              const canPaint = paintableMaterials.some(function(name){
                return matName.includes(name);
              });

              if (!canPaint) {
                return;
              }

              // preserva textura
              mat.color.set(selectedColor);

              mat.needsUpdate = true;

            });

          });

        });

      });

    // =========================
    // SCALE LABEL
    // =========================

    setInterval(function () {

      if (!model.object3D) {
        return;
      }

      const scale = model.object3D.scale.x;

      const percent = Math.round(scale * 100);

      scaleLabel.innerText = "Size: " + percent + "%";

    }, 120);

  }

});