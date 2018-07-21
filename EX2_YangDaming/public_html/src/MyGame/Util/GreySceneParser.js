/* 
 * YDM @ NUS, Singapore
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GreySceneParser(sceneFilePath) {
    this.mSceneJson = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
    this.sceneInfo = JSON.parse(this.mSceneJson);
}

GreySceneParser.prototype.parseCamera = function () {
    var cx = this.sceneInfo.Camera.Center[0];
    var cy = this.sceneInfo.Camera.Center[1];
    var w = this.sceneInfo.Camera.Width;
    
    /*var viewport_orgX = this.sceneInfo.Camera.Viewport[0];    
    var viewport_orgY = this.sceneInfo.Camera.Viewport[1];
    var viewport_width = this.sceneInfo.Camera.Viewport[2];
    var viewport_height = this.sceneInfo.Camera.Viewport[3];
    var viewport = [viewport_orgX, viewport_orgY, viewport_width, viewport_height];
    */
    var viewport = this.sceneInfo.Camera.Viewport;
    /*var bgColor_r = this.sceneInfo.Camera.BgColor[0];
    var bgColor_g = this.sceneInfo.Camera.BgColor[1];
    var bgColor_b = this.sceneInfo.Camera.BgColor[2];
    var bgColor = [bgColor_r, bgColor_g, bgColor_b];*/
    var bgColor = this.sceneInfo.Camera.BgColor;
    /*var j;
    for (j = 0; j < 4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }*/
    var cam = new Camera(
        vec2.fromValues(cx, cy),  // position of the camera
        w,                        // width of camera
        viewport          
        //vec4.fromValues(viewport_orgX, viewport_orgY, viewport_width, viewport_height);                  
        // viewport (orgX, orgY, width, height)
        );
    cam.setBackgroundColor(bgColor);
    return cam;
};

GreySceneParser.prototype.parseSquares = function (sqSet) {
    var i, j, x, y, w, h, r, c, sq;
    for (i = 0; i < this.sceneInfo.Square.length; i++) {
        x = this.sceneInfo.Square[i].Pos[0];
        y = this.sceneInfo.Square[i].Pos[1];
        w = this.sceneInfo.Square[i].Width;
        h = this.sceneInfo.Square[i].Height;
        r = this.sceneInfo.Square[i].Rotation;
        c = this.sceneInfo.Square[i].Color;
        sq = new Renderable(gEngine.DefaultResources.getConstColorShader());
        /*for (j = 0; j < 4; j++) {
            c[j] = Number(c[j]);
        }*/
        sq.setColor(c);
        sq.getXform().setPosition(x, y);
        sq.getXform().setRotationInDegree(r); // In Degree
        sq.getXform().setSize(w, h);
        sqSet.push(sq);
    }
};

