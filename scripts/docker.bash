export $(grep -v '^#' .env | xargs)

PROJECT_WEB_IMAGE=$(eval echo $PROJECT_WEB_IMAGE)
PROJECT_API_IMAGE=$(eval echo $PROJECT_API_IMAGE)
PROJECT_DATABASE_IMAGE=$(eval echo $PROJECT_DATABASE_IMAGE)

# Print list of options
print_list() {
  echo "Pass wrong arguments! Here is list of arguments for docker test script"
  echo -e "\tremove-images : remove all image"
}

# Main script
if [ $# -eq 1 ]; then
  case "$1" in
  "remove-images")
    docker rmi ${PROJECT_DATABASE_IMAGE} ${PROJECT_API_IMAGE} ${PROJECT_WEB_IMAGE}
    ;;

  "rebuild")
    docker compose down
    docker rmi ${PROJECT_DATABASE_IMAGE} ${PROJECT_API_IMAGE} ${PROJECT_WEB_IMAGE}
    docker compose up -d
    ;;

  *)
    print_list
    ;;
  esac
else
  print_list
fi
