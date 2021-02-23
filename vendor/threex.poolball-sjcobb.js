var THREEx = THREEx || {}

/**
 * Creator for tQuery.PoolBall
 * @return {tQuery.Mesh} instance of 
 */
THREEx.createPoolBall	= function(opts){
    opts	= opts || {}
    // handle parameter polymorphism
    if( typeof(opts) === 'string' )	opts	= {ballDesc: opts};	
    // handle default options
    opts.ballDesc	= opts.ballDesc !== undefined ? opts.ballDesc	: '8'
    opts.stripped	= opts.stripped !== undefined ? opts.stripped	: true
    opts.textureW	= opts.textureW !== undefined ? opts.textureW	: 256
    // build texture based on ballDesc
    if( opts.ballDesc === 'cue' ){
        // build the texture
        var texture	= THREEx.createPoolBall.ballTexture('', false, "#ffffff", opts.textureW);
    }else if( opts.ballDesc === 'black' ){
        // build the texture
        var texture	= THREEx.createPoolBall.ballTexture('', false, "#000000", opts.textureW);
    }else{	
        var fillStylePerDesc	= {
            '1'	: "#FDD017",	// Yellow
            '2'	: "#2B65EC",	// Blue
            '3'	: "#F62817",	// Red
            '4'	: "#7A5DC7",	// Purple
            '5'	: "#F87217",	// Orange
            '6'	: "#348017",	// Green
            '7'	: "#A52A2A",	// Brown or burgundy (tan in some ball sets)
            '8'	: "#000000",	// Black
            '9'	: "#FDD017",	// Yellow
        };
        // sanity check
        console.assert(Object.keys(fillStylePerDesc).indexOf(opts.ballDesc) !== -1);
        // build the texture
        var fillStyle	= fillStylePerDesc[opts.ballDesc];
        var texture	= THREEx.createPoolBall.ballTexture(opts.ballDesc, opts.stripped,
                fillStyle, opts.textureW);
    }
// TODO it would be nice to cache the texture
    
    // create the sphere and use texture
    var geometry	= new THREE.SphereGeometry(0.5, 128, 128)
    var material	= new THREE.MeshPhongMaterial()
    material.map	= texture;
    var object	= new THREE.Mesh(geometry, material)
    // return the just created object
    return object;
}



/**
 * display the shaddow of the smiley in a texture
 *
 * @param {canvasElement} the canvas where we draw
*/
THREEx.createPoolBall.draw	= function(canvas, textData, stripped, fillStyle){
    var ctx		= canvas.getContext( '2d' );
    var xtx		= THREEx.createPoolBall.xCanvas.create(ctx);
    var w		= canvas.width;
    var h		= canvas.height;
    
    // base color is white
    ctx.save();
    ctx.fillStyle	= "#FFFFFF";
    ctx.fillRect(0,0, w, h);
    ctx.restore();

    // do the strip/full
    ctx.save();
    ctx.translate(w/2, h/2)
    var rectH	= stripped ? h/2 : h;
    ctx.fillStyle	= fillStyle;
    ctx.fillRect(-w/2,-rectH/2, w, rectH);
    ctx.restore();
    
    if( textData ){
        // do white circle around textData
        ctx.save();
        ctx.translate(w/4, h/2)
        ctx.fillStyle	= "#FFFFFF";
        var radiusW	= 0.7 * w/4;
        var radiusH	= 1.2 * h/4;
        xtx.fillEllipse(-radiusW/2, -radiusH/2, radiusW, radiusH);
        ctx.restore();

        // draw text data
        ctx.save();
        ctx.translate(w/4, h/2)
        var textH	= w/4;
        ctx.font	= "bolder "+textH+"px Arial";
        ctx.fillStyle	= "#000000";
        var textW	= ctx.measureText(textData).width;
        ctx.fillText(textData, -textW/2, 0.8*textH/2);
        ctx.restore();			
    }
}


THREEx.createPoolBall.ballTexture	= function( textData, stripped, fillStyle, canvasW, mapping ){
    canvasW		= typeof canvasW !== 'undefined' ? canvasW : 512;
    // create the canvas
    var canvas	= document.createElement('canvas');
    canvas.width	= canvas.height	= canvasW;
    // create the texture
    var texture	= new THREE.Texture(canvas, mapping);
    texture.needsUpdate	= true;
    // draw in the texture
    THREEx.createPoolBall.draw(canvas, textData, stripped, fillStyle);
    // return the texture
    return texture;
};

/**
 * helper for the canvas2d API to draw circle and ellipse
 * @type {Object}
 */
THREEx.createPoolBall.xCanvas	= {
    create	: function(ctx){
        var xCanvas	= THREEx.createPoolBall.xCanvas;
        return {
            fillEllipse	: function(aX, aY, aWidth, aHeight){
                return xCanvas.fillEllipse(ctx, aX, aY, aWidth, aHeight)
            }
        }
    },
    // Andrea Giammarchi - Mit Style License
    // Circle methods
    circle		: function(ctx, aX, aY, aDiameter){
        this.ellipse(ctx, aX, aY, aDiameter, aDiameter);
    },
    fillCircle	: function(ctx, aX, aY, aDiameter){
        ctx.beginPath();
        this.circle(ctx, aX, aY, aDiameter);
        ctx.fill();
    },
    strokeCircle	: function(ctx, aX, aY, aDiameter){
        ctx.beginPath();
        this.circle(ctx, aX, aY, aDiameter);
        ctx.stroke();
    },
    // Ellipse methods
    ellipse		: function(ctx, aX, aY, aWidth, aHeight){
        var hB = (aWidth / 2) * 0.5522848,
        vB = (aHeight / 2) * 0.5522848,
        eX = aX + aWidth,
        eY = aY + aHeight,
        mX = aX + aWidth / 2,
        mY = aY + aHeight / 2;
        ctx.moveTo(aX, mY);
        ctx.bezierCurveTo(aX, mY - vB, mX - hB, aY, mX, aY);
        ctx.bezierCurveTo(mX + hB, aY, eX, mY - vB, eX, mY);
        ctx.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
        ctx.bezierCurveTo(mX - hB, eY, aX, mY + vB, aX, mY);
        ctx.closePath();
    },
    fillEllipse	: function(ctx, aX, aY, aWidth, aHeight){
        ctx.beginPath();
        this.ellipse(ctx, aX, aY, aWidth, aHeight);
        ctx.fill();
    },
    strokeEllipse:function(ctx, aX, aY, aWidth, aHeight){
        ctx.beginPath();
        this.ellipse(ctx, aX, aY, aWidth, aHeight);
        ctx.stroke();
    }
};


THREEx.createPoolBallShadow	= function(textureW){
    textureW	= textureW !== undefined ? textureW : 512;

    // Create canvas
    var canvas	= document.createElement( 'canvas' );
    var context	= canvas.getContext( '2d' );
    canvas.width	= textureW;
    canvas.height	= textureW;
    var gradient	= context.createRadialGradient(
        canvas.width  / 2,
        canvas.height / 2,
        0,
        canvas.width  / 2,
        canvas.height / 2,
        canvas.width  / 2
    );
    gradient.addColorStop( 0.0, 'rgba(0,0,0,0.8)' );
    gradient.addColorStop( 0.5, 'rgba(0,0,0,0.7)' );
    gradient.addColorStop( 1.0, 'rgba(0,0,0,0.0)' );
    context.fillStyle	= gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );

    // Create texture
    var texture = new THREE.Texture( canvas );
    texture.needsUpdate = true;

    // create mesh
    var geometry = new THREE.PlaneGeometry(1, 1);
    var material = new THREE.MeshBasicMaterial({
        map		: texture,
        transparent	: true,
    });
    var object3d = new THREE.Mesh( geometry, material );
    object3d.rotation.x = -Math.PI / 2;

    // return the just-built mesh
    return object3d;
};