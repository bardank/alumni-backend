module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'npm',
      args: 'run start:prod',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
