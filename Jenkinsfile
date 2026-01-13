pipeline {
  agent any
  stages {
    stage('Install deps') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
      }
    }
    stage('Run app') {
      steps {
        sh 'npm run app:run'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
  post {
    always {
      sh 'if [ -f .local-automation-pids ]; then kill $(cat .local-automation-pids) || true; fi'
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
