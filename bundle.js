AFRAME.registerComponent('tap-place', {

  init: function () {

    const scene =
      this.el;

    const model =
      document.getElementById('model');

    const ring =
      document.getElementById('tapRing');

    const prompt =
      document.getElementById('promptText');

    // =========================
    // PINCH SCALE
    // =========================

    let initialDistance = 0;
    let initialScale = 1;

    function getDistance(touch1, touch2) {

      const dx =
        touch1.clientX - touch2.clientX;

      const dy =
        touch1.clientY - touch2.clientY;

      return Math.sqrt(dx * dx + dy * dy);
    }

    window.addEventListener('touchstart', function (e) {

      if (e.touches.length === 2) {

        initialDistance = getDistance(
          e.touches[0],
          e.touches[1]
        );

        initialScale =
          model.object3D.scale.x;

      }

    }, { passive: false });

    window.addEventListener('touchmove', function (e) {

      if (e.touches.length === 2) {

        e.preventDefault();

        const currentDistance =
          getDistance(
            e.touches[0],
            e.touches[1]
          );

        let scaleFactor =
          currentDistance / initialDistance;

        let newScale =
          initialScale * scaleFactor;

        // mínimo 30%
        newScale =
          Math.max(0.3, newScale);

        // máximo 100%
        newScale =
          Math.min(1, newScale);

        model.object3D.scale.set(
          newScale,
          newScale,
          newScale
        );

      }

    }, { passive: false });

    // =========================
    // RING FOLLOW
    // =========================

    scene.addEventListener('mousemove', function (event) {

      const intersection =
        event.detail.intersection;

      if (!intersection) {
        return;
      }

      const point =
        intersection.point;

      ring.object3D.visible = true;

      ring.object3D.position.copy(point);

    });

    // =========================
    // TAP PLACE
    // =========================

    scene.addEventListener('click', function (event) {

      const intersection =
        event.detail.intersection;

      if (!intersection) {
        return;
      }

      const point =
        intersection.point;

      model.object3D.position.copy(point);

      model.setAttribute(
        'visible',
        'true'
      );

      // começa em 30%
      model.object3D.scale.set(
        0.3,
        0.3,
        0.3
      );

      prompt.style.display =
        'none';

    });

    // =========================
    // CORES
    // =========================

    const paintableMaterials = [
      'Wall',
      'wall',
      'Paint',
      'paint',
      'Exterior',
      'Facade',
      'Casa'
    ];

    document
      .querySelectorAll('#colorMenu button')
      .forEach(function (btn) {

        btn.addEventListener('click', function () {

          const selectedColor =
            btn.dataset.color;

          model.object3D.traverse(function (obj) {

            if (
              !obj.isMesh ||
              !obj.material
            ) {
              return;
            }

            let materials;

            if (Array.isArray(obj.material)) {
              materials = obj.material;
            } else {
              materials = [obj.material];
            }

            materials.forEach(function (mat) {

              const matName =
                mat.name || '';

              const canPaint =
                paintableMaterials.some(
                  function (name) {
                    return matName.includes(name);
                  }
                );

              if (!canPaint) {
                return;
              }

              // preserva textura
              mat.color.set(
                selectedColor
              );

              mat.needsUpdate = true;

            });

          });

        });

      });

  }

});