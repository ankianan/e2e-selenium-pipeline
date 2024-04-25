const {exec} = require('child_process');
const recordScreen = require('record-screen')

const extendConfigForMac = {
  //for mac
  hostname: '1',
  display:'1',
  inputFormat: 'avfoundation'
};

const recording = recordScreen('/tmp/test.mp4', {
  //resolution: '1440x900', // Display resolution,
  inputFormat: 'mjpeg' 
})

recording.promise
  .then(result => {
    // Screen recording is done
    process.stdout.write(result.stdout)
    process.stderr.write(result.stderr)
  })
  .catch(error => {
    // Screen recording has failed
    console.error(error)
  })

// As an example, stop the screen recording after 5 seconds:
setTimeout(() => {
  recording.stop();
}, 5000)
