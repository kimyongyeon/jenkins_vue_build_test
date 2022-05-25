def DOCKER_CONTAINER_NAME = 'dockerize-vuejs-app-1'
pipeline {
    agent any
    stages {
        stage('git clone/checkout') {
            steps {
                echo '========== git clone/checkout ============'
                git branch: 'main', url: 'https://github.com/kimyongyeon/jenkins_vue_build_test.git'
                sh 'pwd'
                sh 'ls -al'
            }    
        }
        stage('source npm init') {
            steps {
                echo '========== source npm init ============'
                sh 'node -v'
                sh 'npm -v'
                sh 'npm i'
            }    
        }
        stage('source npm build') {
            steps {
                echo '========== npm run build ============'
                sh 'npm run build'
                sh 'ls -al'
            }    
        }
        stage('docker build') {
            steps {
                echo '========== docker build ============'
                sh 'docker buildx build --platform=linux/amd64 -t vuejs-cookbook/dockerize-vuejs-app .'
                sh 'docker images'
            }    
        }
        stage('docker push') {
            steps {
                echo '========== docker push ============'
                sh 'docker tag vuejs-cookbook/dockerize-vuejs-app toyongyeon/dockerize-vuejs-app:1.1'
                sh 'docker push toyongyeon/dockerize-vuejs-app:1.1'
            }    
        }
        stage('docker run') {
            input {
                message "docker run we continue?"
                ok "Yes"
            }
            steps {
                echo '========== docker run ============'
                sh "docker rm -f ${DOCKER_CONTAINER_NAME}"
                sh "docker run -id -p 8088:8080 --rm --name ${DOCKER_CONTAINER_NAME} vuejs-cookbook/dockerize-vuejs-app"
                sh 'docker image prune -a --force'
            }    
        }
        stage('docker state check') {
            steps {
                echo '========== docker state check ============'
                sh 'docker ps'
            }
            input {
                message "ssh conn we continue?"
                ok "Yes"
            }
        }
        stage('ssh aws webserver connect') {
            steps {
                echo '========== ssh aws webserver ============'
                sh """
                    ssh -o StrictHostKeyChecking=no ${TARGET_HOST} '
                    sudo docker rm -f fe-vue-prd
                    sudo docker run -itd -p 9000:8080 --rm --name fe-vue-prd toyongyeon/dockerize-vuejs-app:1.1
                    '
                """
            }
        }
    }
    
    environment {
        TARGET_HOST = "centos@13.124.200.159"
    }
}