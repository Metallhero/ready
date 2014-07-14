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
        
        
        var downloadUrl = "http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf";
        var relativeFilePath = "MyDir/test.pdf";
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            alert("got filesystem");
            alert(fileSystem.root.fullPath);
            alert(fileSystem.root.toURL());
        
        
            var op;
            op = new FileUploadOptions();
            
            op.headers = {
                Connection: "close"
            };
            var fileTransfer = new FileTransfer();
                fileTransfer.download(
                        downloadUrl,
                        fileSystem.root.toURL() + '/' + relativeFilePath,
                function(entry) {
                    alert("download complete: " + entry.fullPath);
                },
                function(error) {
                    alert("download error source " + error.source);
                    alert("download error target " + error.target);
                    alert("upload error code" + error.code);
                });
            }, this.fail);

    },
    fail:function(error) {
        alert(error.code);
    }
};
