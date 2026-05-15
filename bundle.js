// bundle.js

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

      ring.setAttribute(
        'visible',
        'true'
      );

      ring.object3D.position.copy(
        point
      );

      model.setAttribute(
        'visible',
        'true'
      );

      model.object3D.position.copy(
        point
      );

      // começa em 30%
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

              mat.color.set(
                selectedColor
              );

              mat.needsUpdate =
                true;

            });

          });

        });

      });

    // =========================
    // PINCH SCALE
    // =========================

    let initialDistance = 0;
    let initialScale = 1;

    function getDistance(t1, t2) {

      const dx =
        t1.clientX - t2.clientX;

      const dy =
        t1.clientY - t2.clientY;

      return Math.sqrt(
        dx * dx + dy * dy
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

          let scale =
            initialScale *
            (
              currentDistance /
              initialDistance
            );

          scale =
            Math.max(
              0.3,
              Math.min(1, scale)
            );

          model.object3D.scale.set(
            scale,
            scale,
            scale
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
            currentX - previousX;

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