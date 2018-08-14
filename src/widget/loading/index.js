const loading = new class Loading {
    constructor(l) {
      l = l || 80;
      this.render(l);
      this.loop = 1;
      this.timer = null;
      this.ctx = this.cvs.getContext('2d');
      this.l = l;
      this.minL = this.l / 4;
      this.radius = this.minL;
      this.maxL = this.l / 4 * 3;
      this.offsetL = this.maxL - this.minL;
      this.matrix = [{
        x: this.minL,
        y: this.minL
      }, {
        x: this.maxL,
        y: this.minL
      },
      {
        x: this.maxL,
        y: this.maxL
      }, {
        x: this.minL,
        y: this.maxL
      }
      ];
      this.eat = this.matrix.concat([]);
    }
  
    render(l) {
      this.cvs = document.createElement('canvas');
      this.cvs.setAttribute('width', l);
      this.cvs.setAttribute('height', l);
      this.cvs.style.position = 'fixed';
      this.cvs.style.top = '50%';
      this.cvs.style.display = 'none';
      this.cvs.style.left = '50%';
      this.cvs.style.marginLeft = '-' + (l / 2) + 'px';
      this.cvs.style.marginTop = '-' + (l / 2) + 'px';
      this.cvs.style.zIndex = 999;
      document.body.appendChild(this.cvs);
    }
  
    startLoading() {
      this.drawBackend();
      this.dynamicPoint(this.matrix[0]);
      let offset = 0,
        moving = 0,
        count = 10,
        handler = time => {
          if (time - offset > 30) {
            this.ctx.clearRect(0, 0, this.l, this.l);
            let flag = Math.floor(count / 10);
            let matrix = this.matrix[flag];
            let x, y;
            switch (flag) {
              case 0:
                x = matrix.x;
                y = Math.floor(this.maxL - this.offsetL / 10 * moving);
                this.eat = this.loop % 2 === 0 ? [] : [{
                  x: this.minL,
                  y: this.minL
                }, {
                  x: this.maxL,
                  y: this.minL
                },
                {
                  x: this.maxL,
                  y: this.maxL
                }, {
                  x: this.minL,
                  y: this.maxL
                }
                ];
                break;
              case 1:
                x = Math.floor(this.minL + this.offsetL / 10 * moving);
                y = matrix.y
                this.eat = this.loop % 2 === 0 ? [{
                  x: this.minL,
                  y: this.minL
                }] : [{
                  x: this.maxL,
                  y: this.minL
                },
                {
                  x: this.maxL,
                  y: this.maxL
                }, {
                  x: this.minL,
                  y: this.maxL
                }
                  ];
                break;
              case 2:
                x = matrix.x;
                y = Math.floor(this.minL + this.offsetL / 10 * moving);
                this.eat = this.loop % 2 === 0 ? [{
                  x: this.minL,
                  y: this.minL
                }, {
                  x: this.maxL,
                  y: this.minL
                }] : [{
                  x: this.maxL,
                  y: this.maxL
                }, {
                  x: this.minL,
                  y: this.maxL
                }];
                break;
              case 3:
                x = Math.floor(this.maxL - this.offsetL / 10 * moving);
                y = matrix.y
                this.eat = this.loop % 2 === 0 ? [{
                  x: this.minL,
                  y: this.minL
                }, {
                  x: this.maxL,
                  y: this.minL
                },
                {
                  x: this.maxL,
                  y: this.maxL
                }
                ] : [{
                  x: this.minL,
                  y: this.maxL
                }];
                break;
            }
            //计数器处理
            count++;
            if (count >= 40) count = 0;
            moving++;
            if (moving >= 10) moving = 0;
            offset = time;
            if (count == 0) {
              this.loop++;
            }
  
            this.drawBackend();
            this.dynamicPoint({
              x,
              y
            });
          }
          this.timer = window.requestAnimationFrame(handler);
        };
      this.timer = window.requestAnimationFrame(time => {
        handler(time);
      });
    }
  
    dynamicPoint(step) {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#2CC7C5';
      this.ctx.arc(step.x, step.y, this.radius, 0, 2 * Math.PI, true);
      this.ctx.fill();
    }
  
    stop() {
      this.cvs.style.display = 'none';
      window.cancelAnimationFrame(this.timer);
    }
  
    run() {
      this.cvs.style.display = 'block';
      this.startLoading();
    }
  
    drawBackend() {
      let ctx = this.ctx;
      this.eat.forEach(value => {
        ctx.beginPath();
        ctx.fillStyle = '#73DACF';
        ctx.arc(value.x, value.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
      });
    }
  
  }
  
  export default loading;
  