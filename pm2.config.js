module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'npm',
      args: 'start:prod',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
