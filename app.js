window.addEventListener("load", (event) => {
    let gA, gB, gC, gD, gE, gF, gG
    
    let image
    let canvas = document.getElementById('imageCanvas');
    let outCanvas = document.getElementById('outCanvas');
    let out = outCanvas.getContext('2d');
    let ctx = canvas.getContext('2d');
    
    const clickImg = document.getElementsByClassName("clickImg")
    for (let i = 0; i < clickImg.length; i++) {
        clickImg[i].addEventListener("click", function(){ uploadImageURL(clickImg[i].src); }); 
    }
    
    document.getElementById("PosX").value = null
    document.getElementById("PosY").value = null
    document.getElementById('A').checked = true
    
    document.getElementById('imageLoader').addEventListener('change', handleImage);
    document.getElementById('PosX').addEventListener('change', updatePoint);
    document.getElementById('PosY').addEventListener('change', updatePoint);
    document.getElementById('resX').addEventListener('change', updateDist);
    document.getElementById('resY').addEventListener('change', updateDist);
    document.getElementById('A').addEventListener('change', updateViewedPos);
    document.getElementById('B').addEventListener('change', updateViewedPos);
    document.getElementById('C').addEventListener('change', updateViewedPos);
    document.getElementById('D').addEventListener('change', updateViewedPos);
    document.getElementById('E').addEventListener('change', updateViewedPos);
    document.getElementById('F').addEventListener('change', updateViewedPos);
    document.getElementById('G').addEventListener('change', updateViewedPos);    
    document.getElementById('update').addEventListener('click', updateImg);
    canvas.addEventListener('mousedown', handleClick, false);
    
    function updatePoint() {
        if (document.getElementById("A").checked) {
            gA = {x: document.getElementById("PosX").valueAsNumber, y: document.getElementById("PosY").valueAsNumber}
        }
        if (document.getElementById("B").checked) {
            gB = {x: document.getElementById("PosX").valueAsNumber, y: document.getElementById("PosY").valueAsNumber}
        }
        if (document.getElementById("C").checked) {
            gC = {x: document.getElementById("PosX").valueAsNumber, y: document.getElementById("PosY").valueAsNumber}
        }
        if (document.getElementById("D").checked) {
            gD = {x: document.getElementById("PosX").valueAsNumber, y: document.getElementById("PosY").valueAsNumber}
        }
        if (document.getElementById("E").checked) {
            gE = {x: document.getElementById("PosX").valueAsNumber, y: document.getElementById("PosY").valueAsNumber}
        }
        if (document.getElementById("F").checked) {
            gF = {x: document.getElementById("PosX").valueAsNumber, y: document.getElementById("PosY").valueAsNumber}
        }
        if (document.getElementById("G").checked) {
            gG = {x: document.getElementById("PosX").valueAsNumber, y: document.getElementById("PosY").valueAsNumber}
        }
        updateCanvas()
    }
    
    function updateCanvas() {
        if (!image) {
            return;
        }
        updateDist()
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(image.img, image.x, image.y, image.newWidth, image.newHeight);
        ctx.fillStyle = "red";
        ctx.font = "1.2em sans";
        if (gA) {
            ctx.fillRect(gA.x-1, gA.y-1, 3, 3);
            ctx.fillText("A", gA.x + 5, gA.y + 5);
        }
        if (gB) {
            ctx.fillRect(gB.x-1, gB.y-1, 3, 3);
            ctx.fillText("B", gB.x + 5, gB.y + 5);
        }
        if (gC) {
            ctx.fillRect(gC.x-1, gC.y-1, 3, 3);
            ctx.fillText("C", gC.x + 5, gC.y + 5);
        }
        if (gD) {
            ctx.fillRect(gD.x-1, gD.y-1, 3, 3);
            ctx.fillText("D", gD.x + 5, gD.y + 5);
        }
        ctx.fillStyle = "blue";
        if (gE) {
            ctx.fillRect(gE.x-1, gE.y-1, 3, 3);
            ctx.fillText("E", gE.x + 5, gE.y + 5);
        }
        if (gF) {
            ctx.fillRect(gF.x-1, gF.y-1, 3, 3);
            ctx.fillText("F", gF.x + 5, gF.y + 5);
        }
        if (gG) {
            ctx.fillRect(gG.x-1, gG.y-1, 3, 3);
            ctx.fillText("G", gG.x + 5, gG.y + 5);
        }
    }
    
    function updateViewedPos() {
        if (document.getElementById("A").checked) {
            document.getElementById("PosX").value = gA ? Math.round(gA.x) : null
            document.getElementById("PosY").value = gA ? Math.round(gA.y) : null
        }
        if (document.getElementById("B").checked) {
            document.getElementById("PosX").value = gB ? Math.round(gB.x) : null
            document.getElementById("PosY").value = gB ? Math.round(gB.y) : null
        }
        if (document.getElementById("C").checked) {
            document.getElementById("PosX").value = gC ? Math.round(gC.x) : null
            document.getElementById("PosY").value = gC ? Math.round(gC.y) : null
        }
        if (document.getElementById("D").checked) {
            document.getElementById("PosX").value = gD ? Math.round(gD.x) : null
            document.getElementById("PosY").value = gD ? Math.round(gD.y) : null
        }
        if (document.getElementById("E").checked) {
            document.getElementById("PosX").value = gE ? Math.round(gE.x) : null
            document.getElementById("PosY").value = gE ? Math.round(gE.y) : null
        }
        if (document.getElementById("F").checked) {
            document.getElementById("PosX").value = gF ? Math.round(gF.x) : null
            document.getElementById("PosY").value = gF ? Math.round(gF.y) : null
        }
        if (document.getElementById("G").checked) {
            document.getElementById("PosX").value = gG ? Math.round(gG.x) : null
            document.getElementById("PosY").value = gG ? Math.round(gG.y) : null
        }
    }
    
    function uploadImageURL(src) {
        let img = new Image();
        img.onload = function() {
            let scale_factor = Math.min(canvas.width/img.width, canvas.height/img.height);
            let newWidth = img.width * scale_factor;
            let newHeight = img.height * scale_factor;
            let x = (canvas.width/2) - (newWidth/2);
            let y = (canvas.height/2) - (newHeight/2);
            image = {img: img, x: x, y: y, newWidth: newWidth, newHeight: newHeight}

            gA = gB = gC = gD = gE = gF = gG = undefined

            updateCanvas()
        }
        img.crossOrigin = "anonymous"; // won't work on FILE:/// can't do much 'bout that ig
        img.src = src
    }
    
    function handleClick(e) {
        if (!image) {
            return
        }
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        if (document.getElementById("A").checked) {
            document.getElementById("B").checked = true;
            
            gA = {x: x, y: y}
        } else if (document.getElementById("B").checked) {
            document.getElementById("C").checked = true;
            
            gB = {x: x, y: y}
        } else if (document.getElementById("C").checked) {
            document.getElementById("D").checked = true;
            
            gC = {x: x, y: y}
        } else if (document.getElementById("D").checked) {
            document.getElementById("A").checked = true;
            
            gD = {x: x, y: y}
        } else if (document.getElementById("E").checked) {            
            gE = {x: x, y: y}
        } else if (document.getElementById("F").checked) {            
            gF = {x: x, y: y}
        } else if (document.getElementById("G").checked) {            
            gG = {x: x, y: y}
        }
        
        updateViewedPos() 
        updateCanvas()
    }
    
    function handleImage(e) {
        let reader = new FileReader();
        reader.onload = function(event) {
            let img = new Image();
            img.onload = function(){
                let scale_factor = Math.min(canvas.width/img.width, canvas.height/img.height);
                let newWidth = img.width * scale_factor;
                let newHeight = img.height * scale_factor;
                let x = (canvas.width/2) - (newWidth/2);
                let y = (canvas.height/2) - (newHeight/2);
                image = {img: img, x: x, y: y, newWidth: newWidth, newHeight: newHeight}
                
                gA = gB = gC = gD = gE = gF = gG = undefined
                
                updateCanvas()
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);     
    }
    
    function getImage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image.img, image.x, image.y, image.newWidth, image.newHeight);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        updateCanvas()
        return data
    }
    
    function lineIntersection(A, B, C, D) {
        let a1 = B.y - A.y
        let b1 = A.x - B.x
        let c1 = a1*A.x + b1*A.y
        
        let a2 = D.y - C.y
        let b2 = C.x - D.x
        if (D.u == 0) {
            a2 = -D.y
            b2 = D.x
        }
        let c2 = a2*C.x + b2*C.y
        
        let determinant = a1*b2 - a2*b1
        
        if (determinant == 0) {
            return {x: b1, y: -a1, u: 0}
        } else {
            let x = (b2*c1 - b1*c2)/determinant
            let y = (a1*c2 - a2*c1)/determinant
            return {x: x, y: y, u: 1}
        }
    }
    
    function dist(A, B) {
        return Math.sqrt((A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y))
    }
    
    function biRateo(A, B, C, D) {
        let a = dist(B, C)
        if (Math.abs(A.x-B.x) > Math.abs(A.y-B.y)) {
            if (B.x > C.x) a *= -1
        } else {
            if (B.y > C.y) a *= -1
        }
        let b = dist(A,D)
        if (Math.abs(A.x-B.x) > Math.abs(A.y-B.y)) {
            if (A.x > D.x) b *= -1
        } else {
            if (A.y > D.y) b *= -1
        }
        let c = dist(A, C)
        if (Math.abs(A.x-B.x) > Math.abs(A.y-B.y)) {
            if (A.x > C.x) c *= -1
        } else {
            if (A.y > C.y) c *= -1
        }
        let d = dist(B, D)
        if (Math.abs(A.x-B.x) > Math.abs(A.y-B.y)) {
            if (B.x > D.x) d *= -1
        } else {
            if (B.y > D.y) d *= -1
        }
        
        if (a*b*c*d == 0) {
            return null
        }
        if (A.u === 0) {
            return d/a
        }
        if (B.u === 0) {
            return c/b
        }
        if (C.u === 0) {
            return d/b
        }
        if (D.u === 0) {
            return c/a
        }
        return c*d/(b*a)
    }
    
    function coord(a, b, r) {
        return (b*r-a)/(r-1)
    }
    
    function point(A, B, C, D, P, a, d) {
        if (P.x==A.x && P.y==A.y) {
            return {x: d.x, y: a.y+d.y}
        }
        if (P.x==B.x && P.y==B.y) {
            return {x: 0, y: a.y+d.y}
        }
        if (P.x==C.x && P.y==C.y) {
            return {x: a.x+d.x, y: 0}
        }
        if (P.x==D.x && P.y==D.y) {
            return {x: 0, y: 0}
        }
        let d0 = lineIntersection(A, B, C, D)
        let a0 = lineIntersection(B, D, P, d0)
        let b0 = lineIntersection(A, C, P, d0)
        let r0 = biRateo(a0, b0, P, d0)
        
        let d1 = lineIntersection(A, C, B, D)
        let a1 = lineIntersection(C, D, P, d1)
        let b1 = lineIntersection(A, B, P, d1)
        let r1 = biRateo(a1, b1, P, d1)
        
        return {x: coord(a.x, d.x, r0), y: coord(a.y, d.y, r1)}
    }
    
    function updateDist() {
        if (!image || !gA || !gB || !gC || !gD || !gE || !gF || !convexHull([gA, gB, gC, gD], 4) || !isCW([gA, gB, gC, gD])) {
            document.getElementById("dist").innerText = "NA"
            document.getElementById("ang").innerText = "NA"
            return
        }
     
        let A = gA, B = gB, C = gD, D = gC
        let tmp = lineIntersection(gA, gD, gB, gC)
        if (tmp.x < Math.max(gA.x, gD.x) && tmp.x > Math.min(gA.x, gD.x) && tmp.y < Math.max(gA.y, gD.y) && tmp.y > Math.min(gA.y, gD.y)) {
            C = gC;
            D = gD;
        }
        tmp = lineIntersection(gA, gB, gC, gD)
        if (tmp.x < Math.max(gA.x, gB.x) && tmp.x > Math.min(gA.x, gB.x) && tmp.y < Math.max(gA.y, gB.y) && tmp.y > Math.min(gA.y, gB.y)) {
            B = gC;
            D = gB;
        }
        let res = {x: -document.getElementById("resX").valueAsNumber, y: -document.getElementById("resY").valueAsNumber}
        
        let E = point(A, B, C, D, gE, {x: 0, y: 0}, res)
        let F = point(A, B, C, D, gF, {x: 0, y: 0}, res)
        document.getElementById("dist").innerText = dist(E, F).toFixed(3);
        
        if (!gG) {
            document.getElementById("ang").innerText = "NA"
            return
        }
        
        let G = point(A, B, C, D, gG, {x: 0, y: 0}, res)
        let v1 = {x: E.x-F.x, y: E.y-F.y}
        let v2 = {x: G.x-F.x, y: G.y-F.y}
        let scal = v1.x*v2.x+v1.y*v2.y
        let ang = Math.acos(scal/dist(v1, {x: 0, y: 0})/dist(v2, {x: 0, y: 0}))/Math.PI*180
        document.getElementById("ang").innerText = ang.toFixed(2)+"°"
    }
    
    function isCW(pts) {
        let tmp = lineIntersection(gA, gD, gB, gC)
        if (tmp.x < Math.max(gA.x, gD.x) && tmp.x > Math.min(gA.x, gD.x) && tmp.y < Math.max(gA.y, gD.y) && tmp.y > Math.min(gA.y, gD.y)) {
            return false;
        }
        tmp = lineIntersection(gA, gB, gC, gD)
        if (tmp.x < Math.max(gA.x, gB.x) && tmp.x > Math.min(gA.x, gB.x) && tmp.y < Math.max(gA.y, gB.y) && tmp.y > Math.min(gA.y, gB.y)) {
            return false;
        }
        
        const len = pts.length;
        let [minx, miny, mi] = [pts[0].x, pts[0].y, 0];
        for (let i = 1; i < len; i++) {
            const [pix, piy] = [pts[i].x, pts[i].y];
            if (pix < minx || pix == minx && piy < miny) [minx, miny, mi] = [pix, piy, i];
        }
        const [mp, mn] = [mi != 0 ? mi - 1 : len - 1, mi != len - 1 ? mi + 1 : 0];
        const [a, b, c] = [pts[mp], pts[mi], pts[mn]];
        const det = (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
        
        return det >= 0
    }
    
    function updateImg() {
        document.getElementById('msg').innerHTML = ""

        if (!image) { document.getElementById('msg').innerHTML = "Carica un'<strong>immagine</strong> per iniziare"; return }
        if (!gA) { document.getElementById('msg').innerHTML = "Nessun valore per il punto <strong>A</strong>"; return }
        if (!gB) { document.getElementById('msg').innerHTML = "Nessun valore per il punto <strong>B</strong>"; return }
        if (!gC) { document.getElementById('msg').innerHTML = "Nessun valore per il punto <strong>C</strong>"; return }
        if (!gD) { document.getElementById('msg').innerHTML = "Nessun valore per il punto <strong>D</strong>"; return }
        if (!convexHull([gA, gB, gC, gD], 4)) { document.getElementById('msg').innerHTML = "Indicare 4 punti <strong>distinti</strong> e <strong>convessi</strong>"; return }
        if(!isCW([gA, gB, gC, gD])) { document.getElementById('msg').innerHTML = "Fornire i 4 punti in senso <strong>orario</strong>"; return }
        
        out.clearRect(0, 0, outCanvas.width, outCanvas.height);
        let res = {x: -document.getElementById("resX").valueAsNumber, y: -document.getElementById("resY").valueAsNumber}
        
        const inData = getImage();
        const imageData = out.getImageData(0, 0, canvas.width, canvas.height);
        outCanvas.width = canvas.width
        outCanvas.height = canvas.height
        
        const outData = imageData.data;
        
        let A = gA, B = gB, C = gD, D = gC
        
        let pa = [null, null, null, null]
        let pi = [{x: 0, y: 0}, {x: 0, y: canvas.height}, {x: canvas.width, y: 0}, {x: canvas.width, y: canvas.height}]
        for (let i = 0; i < 4; i++) {
            pa[i] = point(A, B, C, D, pi[i], {x: 0, y: 0}, res)
            pa[i].x += document.getElementById("offX").valueAsNumber
            pa[i].y += document.getElementById("offY").valueAsNumber
            pa[i].x = Math.round(pa[i].x) + outCanvas.width/2 - res.x/2
            pa[i].y = Math.round(pa[i].y) + outCanvas.height/2 - res.y/2
        }
        let mx = Math.min(pa[0].x,pa[1].x,pa[2].x,pa[3].x)
        let my = Math.min(pa[0].y,pa[1].y,pa[2].y,pa[3].y)
        let Mx = Math.max(pa[0].x,pa[1].x,pa[2].x,pa[3].x)
        let My = Math.max(pa[0].y,pa[1].y,pa[2].y,pa[3].y)
        if (Mx < 0 || My < 0 || mx >= outCanvas.width || my >= outCanvas.height) { document.getElementById('msg').innerHTML = "<strong>Offset troppo grandi</strong> in modulo, nessun pixel verrebbe visualizzato"; return }
        
        for (let i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                let p = point(A, B, C, D, {x: i, y: j}, {x: 0, y: 0}, res)
                if (!p || !inData[4*(j*canvas.width+i) + 3]) {
                    continue
                }
                p.x += document.getElementById("offX").valueAsNumber
                p.y += document.getElementById("offY").valueAsNumber
                let x = Math.round(p.x) + outCanvas.width/2 - res.x/2
                let y = Math.round(p.y) + outCanvas.height/2 - res.y/2
                if (x < 0 || y < 0 || x >= outCanvas.width || y >= outCanvas.height) {
                    continue
                }
                outData[4*(y*outCanvas.width+x)] = inData[4*(j*canvas.width+i)]
                outData[4*(y*outCanvas.width+x) + 1] = inData[4*(j*canvas.width+i) + 1]
                outData[4*(y*outCanvas.width+x) + 2] = inData[4*(j*canvas.width+i) + 2]
                outData[4*(y*outCanvas.width+x) + 3] = inData[4*(j*canvas.width+i) + 3]
            }
        }
        out.putImageData(imageData, 0, 0); 
    }
    
    function orientation(p, q, r) {
        let val = (q.y - p.y) * (r.x - q.x) -
        (q.x - p.x) * (r.y - q.y);
        
        if (val == 0) return 0;
        return (val > 0)? 1: 2;
    }
    
    function convexHull(points, n) {
        if (n < 3) return;
        
        let hull = []; 
        let l = 0;
        for (let i = 1; i < n; i++)  {
            if (points[i].x < points[l].x) { 
                l = i;
            }
        }
        
        let p = l, q;
        do {
            hull.push(points[p]);
            q = (p + 1) % n;
            
            for (let i = 0; i < n; i++) {  
                if (orientation(points[p], points[i], points[q]) == 2) {
                    q = i;
                }
            }
            
            p = q;
        } while (p != l);
        
        return hull.length == n
    }
});