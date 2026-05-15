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

    let isPlaced = false;

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

      // ring
      ring.setAttribute(
        'visible',
        'true'
      );

      ring.object3D.position.copy(
        point
      );

      // model
      model.setAttribute(
        'visible',
        'true'
      );

      model.object3D.position.copy(
        point
      );

      // começa pequeno somente 1 vez
      if (!isPlaced) {

        model.object3D.scale.set(
          0.3,
          0.3,
          0.3
        );

        isPlaced = true;

      }

      prompt.style.display =
        'none';

    });

    // =========================
    // COLOR CHANGE
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

            if (
              Array.isArray(obj.material)
            ) {

              materials =
                obj.material;

            } else {

              materials = [
                obj.material
              ];

            }

            materials.forEach(function (mat) {

              const matName =
                mat.name || '';

              const canPaint =
                paintableMaterials.some(
                  function (name) {

                    return matName.includes(
                      name
                    );

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

    // =========================
    // PINCH SCALE
    // =========================

    let initialDistance = 0;
    let initialScale = 1;

    function getDistance(
      touch1,
      touch2
    ) {

      const dx =
        touch1.clientX -
        touch2.clientX;

      const dy =
        touch1.clientY -
        touch2.clientY;

      return Math.sqrt(
        dx * dx +
        dy * dy
      );

    }

    window.addEventListener(
      'touchstart',
      function (e) {

        if (
          e.touches.length === 2
        ) {

          initialDistance =
            getDistance(
              e.touches[0],
              e.touches[1]
            );

          initialScale =
            model.object3D.scale.x;

        }

      },
      { passive:false }
    );

    window.addEventListener(
      'touchmove',
      function (e) {

        if (
          e.touches.length === 2
        ) {

          e.preventDefault();

          const currentDistance =
            getDistance(
              e.touches[0],
              e.touches[1]
            );

          let scaleFactor =
            currentDistance /
            initialDistance;

          let newScale =
            initialScale *
            scaleFactor;

          // mínimo 30%
          newScale =
            Math.max(
              0.3,
              newScale
            );

          // máximo 100%
          newScale =
            Math.min(
              1,
              newScale
            );

          model.object3D.scale.set(
            newScale,
            newScale,
            newScale
          );

        }

      },
      { passive:false }
    );

    // =========================
    // ROTATION
    // =========================

    let previousX = 0;

    let rotating = false;

    window.addEventListener(
      'touchstart',
      function (e) {

        if (
          e.touches.length === 1 &&
          isPlaced
        ) {

          rotating = true;

          previousX =
            e.touches[0].clientX;

        }

      }
    );

    window.addEventListener(
      'touchmove',
      function (e) {

        if (
          rotating &&
          e.touches.length === 1
        ) {

          const currentX =
            e.touches[0].clientX;

          const deltaX =
            currentX -
            previousX;

          model.object3D.rotation.y +=
            deltaX * 0.01;

          previousX =
            currentX;

        }

      }
    );

    window.addEventListener(
      'touchend',
      function () {

        rotating = false;

      }
    );

  }

});