/* 
 * YDM @ NUS, Singapore
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BlueScene() {
    // scene file name
    this.kSceneFile = "assets/Blue.xml";
    // all squares
    this.mSqSet = [];        // these are the Renderable objects

    // The camera to view the scene
    this.mCamera = null;
    this.lCamera = null;
}
gEngine.Core.inheritPrototype(BlueScene, Scene);

BlueScene.prototype.loadScene = function () {
    // load the scene file
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

BlueScene.prototype.unloadScene = function () {
    // unload the scene flie
    //gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

    var change = new GreyScene();  // next level to be loaded
    gEngine.Core.startScene(change);
};

BlueScene.prototype.initialize = function () {
    var sceneParser = new BlueSceneParser(this.kSceneFile);

    // Step A: Read in the camera
    this.mCamera = sceneParser.parseCamera();
    this.lCamera = new Camera([20, 60], 20, [20, 40, 60, 30]);

    // Step B: Read all the squares
    sceneParser.parseSquares(this.mSqSet);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BlueScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z) && this.mCamera.mWCWidth < 100) {
        this.mCamera.mWCWidth += 1;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X) && this.mCamera.mWCWidth > 1) {
        this.mCamera.mWCWidth -= 1;
    }
    //两个if是针对同时按键
 
    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
    
   if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) 
            && this.lCamera.mViewport[0] < 640) {
        this.lCamera.mViewport[0] += 2;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)
            && this.lCamera.mViewport[0] > 0) {
        this.lCamera.mViewport[0] -= 2;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)
            && this.lCamera.mViewport[1] < 480) {
        this.lCamera.mViewport[1] += 2;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)
            && this.lCamera.mViewport[1] > 0) {
        this.lCamera.mViewport[1] -= 2;
    }
    this.lCamera.mBgColor = [0, 1, 1, 1];
    this.lCamera.setupViewProjection();
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.lCamera.getVPMatrix());
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BlueScene.prototype.update = function () {
    // For this very simple game, let's move the first square
    /*var xform = this.mSqSet[1].getXform();
    var deltaX = 0.05;

    /// Move right and swap ovre
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(12, 60);
        }
    }

    // Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 11) { // this is the left-boundary
            gEngine.GameLoop.stop();
        }
    }*/
    var deltaX = 0.01;
    var Xform0 = this.mSqSet[0].getXform();
    Xform0.incRotationByDegree(0.1);
    if (Xform0.getYPos() > 68) Xform0.setPosition(18, 52);
    Xform0.incXPosBy(deltaX);
    Xform0.incYPosBy(deltaX);
    
    //Q键switch
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
            gEngine.GameLoop.stop();
        }
};