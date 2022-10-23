
class Canvas{
    coun = 2;
    counCirc = 2;
    firstPos = {x: 0, y: 0};
    secondPos = {x: 0, y: 0};
    lines = {};
    circle = {};


    constructor(ide, width, height, but){
        this.id = document.getElementById(`${ide}`)
        this.c = this.id.getContext('2d')
        this.id.width = width
        this.id.height = height
        this.button = document.getElementById(`${but}`)      
    }


    click(){    
        this.c.strokeRect(0, 0, this.id.width, this.id.height)
        this.id.addEventListener('click',(e) => {this.leftclick(e)});
        this.id.addEventListener('contextmenu',(e) => {this.rightclick(e)});
        this.button.addEventListener('click',(e) =>{this.usebutton(e)})
    }


    leftclick(ev){
        if (this.coun % 2 === 0){
        this.firstPos.x = Number(ev.clientX);
        this.firstPos.y = Number(ev.clientY);
        this.id.addEventListener('mousemove', (e) =>{
            if (this.coun %2 === 1){
                this.c.clearRect( 1, 1, this.id.width - 2, this.id.height - 2);
                buildLine(this.firstPos.x, e.clientX, this.firstPos.y, e.clientY, this.c)
            try{for(let i in this.lines){
                buildLine(this.lines[i].firstPos.x, this.lines[i].secondPos.x, this.lines[i].firstPos.y, this.lines[i].secondPos.y, this.c)
                pointOfLines(this.lines[i].firstPos.x, this.lines[i].firstPos.y,this.lines[i].secondPos.x, this.lines[i].secondPos.y,this.firstPos.x, this.firstPos.y,e.clientX, e.clientY, this.c)};
            for(let int in this.circle){
                buildCircle(this.circle[int].center.x,this.circle[int].center.y, this.c)}
            }catch(err){console.log(err)}         
            }else{}
        })
        this.coun +=1;
        return}
        else if(this.coun % 2 === 1){
            buildLine(this.firstPos.x, ev.clientX, this.firstPos.y, ev.clientY, this.c)
            this.secondPos.x = Number(ev.clientX);
            this.secondPos.y = Number(ev.clientY);
            this.lines[this.coun] = {firstPos:{x:this.firstPos.x, y:this.firstPos.y},secondPos:{x:this.secondPos.x, y:this.secondPos.y}};
        try{
            for(let i in this.lines){
                if (undefined == pointOfLines(this.lines[i].firstPos.x, this.lines[i].firstPos.y,this.lines[i].secondPos.x, this.lines[i].secondPos.y,this.firstPos.x, this.firstPos.y, ev.clientX, ev.clientY, this.c, this.coun)){}
                else{this.circle[this.counCirc] = pointOfLines(this.lines[i].firstPos.x, this.lines[i].firstPos.y, this.lines[i].secondPos.x, this.lines[i].secondPos.y, this.firstPos.x, this.firstPos.y, ev.clientX, ev.clientY, this.c, this.coun);
                this.counCirc +=1;}
            }
        }catch(err){console.log(err)}
        this.coun +=1;
        return;} 
    }


    rightclick(e){
        e.preventDefault();
        if (this.coun %2 === 1){
            this.c.clearRect( 1, 1, this.id.width - 2, this.id.height - 2);
            this.coun += 1;
            delete this.circle[this.counCirc];
            try{for( let i in this.lines){
                buildLine(this.lines[i].firstPos.x, this.lines[i].secondPos.x, this.lines[i].firstPos.y, this.lines[i].secondPos.y, this.c)
            }for(let int in this.circle){
                buildCircle(this.circle[int].center.x, this.circle[int].center.y, this.c)
            }}catch(err){console.log(err)}         
        }else{}
        return;
    }


    usebutton(e){
        console.log(this.lines)
        e.preventDefault();
        this.c.clearRect( 1, 1, this.id.width - 2, this.id.height - 2);
        try{for(let int = 0; int < 300; int++){
            setTimeout(() =>{
            this.c.clearRect( 1, 1, this.id.width - 2, this.id.height - 2);     
            for(let i in this.lines){
            let xcenter = Number((this.lines[i].firstPos.x + this.lines[i].secondPos.x)/2);
            let ycenter = Number((this.lines[i].firstPos.y + this.lines[i].secondPos.y)/2);      
            let pathOfOneTickFirst = (this.lines[i].firstPos.x - xcenter)/300;
            let pathOfOneTickSecond = (this.lines[i].secondPos.x - xcenter)/300;
    
            if (pathOfOneTickFirst < 0){pathOfOneTickFirst = pathOfOneTickFirst*(-1)}
            if (pathOfOneTickSecond < 0){pathOfOneTickSecond = pathOfOneTickSecond*(-1)}
            else{}
    
            let y1= (((ycenter - this.lines[i].firstPos.y)*(pathOfOneTickFirst*int))/(xcenter - this.lines[i].firstPos.x)) + this.lines[i].firstPos.y
            let y2= (((this.lines[i].firstPos.y - ycenter)*((this.lines[i].firstPos.x - pathOfOneTickFirst*int)- xcenter))/(this.lines[i].firstPos.x - xcenter)) + ycenter
            let y3= (((ycenter - this.lines[i].secondPos.y)*(pathOfOneTickFirst*int))/(xcenter - this.lines[i].secondPos.x)) + this.lines[i].secondPos.y
            let y4= (((this.lines[i].secondPos.y - ycenter)*((this.lines[i].secondPos.x - pathOfOneTickFirst*int)- xcenter))/(this.lines[i].secondPos.x - xcenter)) + ycenter 
            if (xcenter >= this.lines[i].firstPos.x){
                buildLine(this.lines[i].firstPos.x + pathOfOneTickFirst*int, xcenter, y1, ycenter, this.c)
            }else if (xcenter <= this.lines[i].firstPos.x){
                buildLine(this.lines[i].firstPos.x - pathOfOneTickFirst*int, xcenter, y2, ycenter, this.c)
            }else{}
            if (xcenter >= this.lines[i].secondPos.x){   
                buildLine(this.lines[i].secondPos.x + pathOfOneTickFirst*int, xcenter, y3, ycenter, this.c)         
            }else if (xcenter <= this.lines[i].secondPos.x){
                buildLine(this.lines[i].secondPos.x - pathOfOneTickFirst*int, xcenter, y4, ycenter, this.c)         
            }else{}
            try{for(let inn in this.circle){
                buildCircle(this.circle[inn].center.x, this.circle[inn].center.y, this.c)
            }}catch(err){console.log(err)}
            try{
            for(let inte in this.circle){
                if ((this.circle[inte].center.x).toFixed(0) - (this.lines[i].firstPos.x  + pathOfOneTickFirst*int).toFixed(0) == 0 && (this.circle[inte].center.y).toFixed(0) - (y1).toFixed(0) == 0 ){delete this.circle[inte]}   
                else if ((this.circle[inte].center.x).toFixed(0) - (this.lines[i].secondPos.x  + pathOfOneTickFirst*int).toFixed(0) == 0 && (this.circle[int].center.y).toFixed(0) - (y3).toFixed(0) == 0 ){delete this.circle[inte]}
                else if ((this.circle[inte].center.x).toFixed(0) - (this.lines[i].firstPos.x  - pathOfOneTickFirst*int).toFixed(0) == 0 && (this.circle[inte].center.y).toFixed(0) - (y2).toFixed(0) == 0 ){delete this.circle[inte]}
                else if ((this.circle[inte].center.x).toFixed(0) - (this.lines[i].secondPos.x  - pathOfOneTickFirst*int).toFixed(0) == 0 && (this.circle[inte].center.y).toFixed(0) - (y4).toFixed(0) == 0 ){delete this.circle[inte]}
                else{}}}catch(err){console.log(err)}
        }},int*10)               
        }}catch(err){console.log(err)}
        setTimeout(() =>{                
            this.c.clearRect( 1, 1, canv.width - 2, canv.height - 2);
            for(let i in this.lines){delete this.lines[i]};
            for(let i in this.circle){delete this.circle[i]};
            this.coun = 2;
            this.counCirc = 2;
            this.firstPos.x = 0;
            this.firstPos.y = 0;
            this.secondPos.x = 0;
            this.secondPos.y = 0;},
        3000)
    }  
}







function pointOfLines(x1, y1, x2, y2, x3, y3, x4, y4, ide, coun){
    const a1 = x2 - x1;
    const b1 = x4 - x3;
    const c1 = x3 - x1;
    const a2 = y2 - y1;
    const b2 = y4 - y3;
    const c2 = y3 - y1;
    const sx = (c1*b2 - c2*b1)/(a1*b2 - a2*b1);
    const sy = (a1*c2 - a2*c1)/(a1*b2 - a2*b1);
    if (sx >= 0 && sy <= 0 && sx <= 1 && sy >= -1){
        const centX = (x1 + sx*(x2 - x1));
        const centY = (y1 + sx*(y2 - y1));
        buildCircle(centX,centY, ide)
        if (coun % 2 === 1){
            return {center:{x:centX, y:centY}};
        }
    }else{return}
}

function buildLine(firx, secx, firy, secy, ide){
    ide.beginPath();
    ide.strokeStyle = "black";
    ide.moveTo(firx, firy);
    ide.lineTo(secx, secy);
    ide.stroke();
}

function buildCircle(x, y, ide){
    ide.beginPath();
    ide.fillStyle = "red";
    ide.arc(x, y, 5, 0, Math.PI*2);
    ide.fill();
}



const canve = new Canvas('canv',1000, 400, 'button').click()
