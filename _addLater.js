// If a user has only been on the current webpage for less than a second, delay for the difference to prevent 429 errors

async function delay(ms) {
    const delay = new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms);
    });
    return (await delay);
}