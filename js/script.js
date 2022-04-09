// class Car {
//     constructor(name, year){
//         this.name = name;
//         this.year = year
//     };
// };
// class Model extends Car{
//     constructor(name, year, color){
//         super(name, year)
//         this.color = color;
//     };
//     age(){
//         return new Date().getFullYear() - this.year;
//     }
// };
// let Lambargini = new Model("Lambargini", 2010, "qora");
// let bugatti = new Model("bugatti", 2007, "kulirang");
// let juguli = new Model("juguli", 1984., "qizil");
// console.log(bugatti.age());

    
////////////////////////////////////////////////////////Slider////////////////////////////////////////////////////////


class Slider {
    constructor(options){
        this.slider = document.querySelector(options.slider);
        this.sliderLine = this.slider.querySelector(".slider__line");
        this.slides = this.sliderLine.children;
        this.prev = this.slider.querySelector(".slider__prev");
        this.next = this.slider.querySelector(".slider__next"); 
    
        
        
        this.width = this.slider.clientWidth;
        this.height = this.slider.clientHeight;
        this.dir = options.direction.toUpperCase() == "Y" ? options.direction.toUpperCase() : "X";
        this.moveTime = options.runTime != undefined ? options.runTime : 1000;
        this.interval = options.interval != undefined ? options.interval : 3000;
        this.moveSize = this.dir == "X" ? this.width : this.height;
        this.activeSlide = 0; 
        
        
        this.sliderLine.style = `
        position: relative;
        height: ${this.height}px;
        overflow: hidden;`
        
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i]
            slide.style = `
                       position: absolute;
                       width: ${this.width}px;
                       height: ${this.height}px;
                   `;     
            
            if (i != this.activeSlide) {
                slide.style.transform =  `translate${this.dir}(${this.moveSize}px)`
            }
            if (i == this.slides.length -1) {
                slide.style.transform =  `translate${this.dir}(-${this.moveSize}px)`
                
            }
        };
        
        
        if (options.autoplay === true) {
            let interval = setInterval(() => {
               this.move(this.next) 
            }, this.interval);
            
            this.slider.addEventListener("mouseenter", () => {
                clearInterval(interval)
            })
            
            this.slider.addEventListener("mouseleave", () =>{
                interval = setInterval(() => {
                    this.move(this.next) 
                 }, this.interval);
            })
        }
        
        
        
        this.prev.addEventListener("click", () =>{
            this.move(this.prev);
        });
        this.next.addEventListener("click", () =>{
            this.move(this.next);
        });
    }
    
    move(btn){
        this.prev.disabled = true;
        this.next.disabled = true;
        
        setTimeout(() => {
            
        this.prev.disabled = false;
        this.next.disabled = false;
        
        }, this.moveTime + 100);
        let btnPrexOrNext = btn == this.prev ? this.moveSize : this.moveSize * -1 ;
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            slide.style.transition = `0ms` 
            if (i != this.activeSlide) {
                slide.style.transform = `translate${this.dir}(${-btnPrexOrNext}px)`
            }           
        };
        this.slides[this.activeSlide].style.transition = `${this.moveTime}ms`;        
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnPrexOrNext}px)`;
        if (btn == this.next) {
            this.activeSlide++;
            if (this.activeSlide == this.slides.length) {
                this.activeSlide = 0;
            }
        }
        
        if (btn == this.prev) {
            this.activeSlide--;
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length-1;
            }
        }
        this.slides[this.activeSlide].style.transition = `${this.moveTime}ms`;
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
    }
}


const slider = new Slider({
    slider: ".slider",
    direction: "X",
    runTime: 1000,
    interval: 3000,
    autoplay: true
});