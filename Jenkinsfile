pipeline {
  agent any
  tools {
    nodejs 'node24'
  }
  environment {
    LOCAL_AUTOMATION_APP_DIR = '/opt/local-automation-app'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Verify LocalAutomationApp') {
      steps {
        sh 'test -d "$LOCAL_AUTOMATION_APP_DIR"'
      }
    }
    stage('Install deps') {
      steps {
        sh 'node -v'
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
      post {
        always {
          sh 'if [ -f .local-automation-pids ]; then kill $(cat .local-automation-pids) || true; fi'
          archiveArtifacts artifacts: 'playwright-report/**,test-results/**', allowEmptyArchive: true
        }
      }
    }
  }
}
