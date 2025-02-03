class PromiseSimple{
  constructor(executorFunction){
    this.promiseChain = []
    this.handleError = () => {} // default error function
    
    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    executorFunction(this.onResolve, this.onReject)
  }

  then(promise){
    this.promiseChain.push(promise)

    return this
  }

  catch(errorFunction){
    this.handleError = errorFunction
    
    return this
  }

  onResolve(value){
    let storedValue = value

    try {
      this.promiseChain.forEach(promise => {
        storedValue = promise(storedValue)
      })
    } catch (error) {
      this.promiseChain = []

      this.onReject(error);  
    }

  }

  onReject(error){
    this.handleError(error)
  }

 }


 fakeApiBackend = () => {
  const user = {
    username: 'treyhuffine',
    favoriteNumber: 42,
    profile: 'https://gitconnected.com/treyhuffine'
  };

  // Introduce a randomizer to simulate the possibility of encountering an error
  if (Math.random() > .05) {
    return {
      data: user,
      statusCode: 200,
    };
  } else {
    const error = {
      statusCode: 404,
      message: 'Could not find user',
      error: 'Not Found',
    };

    return error;
  }
};

// Assume this is your AJAX library.
// Almost all newer ones return a Promise object.
const makeApiCall = () => {
  return new PromiseSimple((resolve, reject) => {
    // Use a timeout to simulate the network delay waiting for the response.
    // This is THE reason you use a promise.
    // It waits for the API to respond, and after received, it executes code in the `then()` blocks in order.
    // If it executed this immediately, there would be no data.
    setTimeout(() => {
      const apiResponse = fakeApiBackend();

      if (apiResponse.statusCode >= 400) {
        reject(apiResponse);
      } else {
        resolve(apiResponse.data);
      }
    }, 5000);
  });
};

makeApiCall()
  .then((user) => {
    console.log('In the first .then()');

    return user;
  })
  .then((user) => {
    console.log(`User ${user.username}'s favorite number is ${user.favoriteNumber}`);

    return user;
  })
  .then((user) => {
    console.log('The previous .then() told you the favoriteNumber')

    return user.profile;
  })
  .then((profile) => {
    console.log(`The profile URL is ${profile}`);
  })
  .then(() => {
    console.log('This is the last then()');
  })
  .catch((error) => {
    console.log(error.message);
  });