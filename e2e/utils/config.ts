export const TEST_ENV = {
    DEV: 0,
    CI:1
}


export const config: {
    testEnv
} = {
    testEnv: TEST_ENV[process.env["TEST_ENV"]]
}