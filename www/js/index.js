/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        alert('Initialize'); 
        console.log('Initialize'); 
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        $('#testready').click(function() {
            alert('Initialize'); 
        });
        
        // var buttomDom;
        // var statusDom;
        // var fileSystem;
//         
        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
        // function(fs) {
            // fileSystem = fs;
//     
            // buttonDom = document.querySelector('#startDl');
            // buttonDom.addEventListener('touchend', function () {
//               
                // buttonDom.setAttribute("disabled","disabled");
                // var op;
                // op = new FileUploadOptions();
//                 
                // op.headers = {
                    // Connection: "close"
                // };
                // var ft = new FileTransfer();
                // var uri = encodeURI("http://archive.org/download/Kansas_Joe_Memphis_Minnie-When_Levee_Breaks/Kansas_Joe_and_Memphis_Minnie-When_the_Levee_Breaks.mp3");
//              
                // var downloadPath = fileSystem.root.fullPath + "/download.mp3";
//                 
                // alert(downloadPath);
                // alert(uri);
//                 
//                 
                // ft.onprogress = function(progressEvent) {
// 
                    // if (progressEvent.lengthComputable) {
                        // var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                        // statusDom.innerHTML = perc + "% loaded...";
                    // } else {
                        // if(statusDom.innerHTML == "") {
                            // statusDom.innerHTML = "Loading";
                        // } else {
                            // statusDom.innerHTML += ".";
                        // }
                    // }
                // };
//                                     
                // ft.download(uri, downloadPath, 
                // function(entry) {
                    // statusDom.innerHTML = "";
                    // alert("download complete: " + entry.fullPath);
                    // // var media = new Media(entry.fullPath, null, function(e) { alert(JSON.stringify(e));});
                    // // media.play();
//                     
                // }, 
                // function(error) {
                    // alert('Crap something went wrong...'+ error.code);  
                // });
//               
//               
//               
            // }, false);
//             
            // buttonDom.removeAttribute("disabled");
            // statusDom = document.querySelector('#status');
//             
        // }, function(e) {
            // alert('failed to get fs');
            // alert(JSON.stringify(e));
        // });
        
        var downloadUrl = "http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf";
        var relativeFilePath = "test.pdf";
        downloadFile(downloadUrl, relativeFilePath);
        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            // alert("got filesystem");
            // alert(fileSystem.root.fullPath);
            // alert(fileSystem.root.toURL());
            // alert('/sdcard/DCIM/' + relativeFilePath);
//         
            // var op;
            // op = new FileUploadOptions();
//             
            // op.headers = {
                // Connection: "close"
            // };
            // var fileTransfer = new FileTransfer();
                // fileTransfer.download(
                        // downloadUrl,
                        // '/sdcard/DCIM/' + relativeFilePath,
                // function(entry) {
                    // alert("download complete: " + entry.fullPath);
                // },
                // function(error) {
                    // alert("download error source " + error.source);
                    // alert("download error target " + error.target);
                    // alert("upload error code" + error.code);
                // });
            // }, this.fail);

    },
    fail:function(error) {
        alert(error.code);
    }
};
function downloadFile(fileUrl, fileName) {
    fileName = fileName.replace(/ /g, '_');
    fileName = fileName.replace(/\+/g, '_');
    var remoteFile = encodeURI(fileUrl);
    var localFileName = fileName;
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        alert('1');
        fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
            alert(fileEntry.name);
            var localPath = fileEntry.fullPath;
            if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                localPath = localPath.substring(7);
            }
            alert(remoteFile);
            alert(localPath);
            var ft = new FileTransfer();
            ft.download(remoteFile,
                localPath, function(entry) {
                    alert('3');
                    window.plugins.childBrowser.openExternal('file:///sdcard/'+fileName);
                    
                }, fail);
        }, fail);
    }, fail);
};
function fail(error) {
        alert(error.code);
};