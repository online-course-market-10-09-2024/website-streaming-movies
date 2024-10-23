export $(grep -v '^#' .env | xargs)

PROJECT_API_CONTAINER=$(eval echo $PROJECT_API_CONTAINER)
PROJECT_DATABASE_CONTAINER=$(eval echo $PROJECT_DATABASE_CONTAINER)

test_wait_postgresql() {
	# Maximum number of attempts to check PostgreSQL readiness
	max_attempts=5

	# Counter for tracking the number of attempts
	attempt_count=0

	# Check PostgreSQL readiness with a loop
	while [ $attempt_count -lt $max_attempts ]; do
		# Try to check PostgreSQL readiness with a 5-second timeout for each attempt
		if timeout 5 docker exec ${PROJECT_DATABASE_CONTAINER} pg_isready; then
			echo "PostgreSQL is ready"
			break
		else
			echo "Waiting for PostgreSQL to become ready... attempt $((attempt_count + 1))"
		fi
		attempt_count=$((attempt_count + 1))
		sleep 2
	done

	# If PostgreSQL is not ready after max_attempts, exit with an error
	if [ $attempt_count -ge $max_attempts ]; then
		echo "PostgreSQL is not ready after $max_attempts attempts. Exiting..."
		exit 1
	fi

	# Run the test if PostgreSQL is ready
	echo "PostgreSQL is ready after $attempt_count attempts. Running the test..."

	case $1 in
		"route-moviecategory" )
			docker exec ${PROJECT_API_CONTAINER} npm run test-route-moviecategory
		;;

		"route-moviedirector" )
			docker exec ${PROJECT_API_CONTAINER} npm run test-route-moviedirector
		;;

		"route-movie" )
			docker exec ${PROJECT_API_CONTAINER} npm run test-route-movie
		;;

		"service-moviecategory" )
			docker exec ${PROJECT_API_CONTAINER} npm run test-service-moviecategory
		;;

		"service-moviedirector" )
			docker exec ${PROJECT_API_CONTAINER} npm run test-service-moviedirector
		;;

		"service-movie" )
			docker exec ${PROJECT_API_CONTAINER} npm run test-service-movie
		;;

		"service-moviedependmoviecategory" )
			docker exec ${PROJECT_API_CONTAINER} go test -v \
				/api-chi/cmd/services/movie_depend_movie_category.go /api-chi/cmd/services/movie_depend_movie_category_test.go
			;;

		"service-moviedependmoviedirector" )
			docker exec ${PROJECT_API_CONTAINER} go test -v \
				/api-chi/cmd/services/movie_depend_movie_director.go /api-chi/cmd/services/movie_depend_movie_director_test.go
			;;

		"service-useraccount" )
			docker exec ${PROJECT_API_CONTAINER} npm run test-service-useraccount
		;;

		"route-moviedependmoviecategory" )
			docker exec ${PROJECT_API_CONTAINER} go test -v \
				/api-chi/cmd/routes/movie_depend_movie_category.go /api-chi/cmd/routes/movie_depend_movie_category_test.go
			;;
	esac
}

# Print list of options
print_list() {
	echo "Pass wrong arguments! Here is list of arguments for docker test script"
	echo -e "\ttest : test all unit test"
}

# Main script
if [ $# -eq 1 ]; then
	case "$1" in
		"api-route-moviecategory" )
			test_wait_postgresql "route-moviecategory";;

		"api-route-moviedirector" )
			test_wait_postgresql "route-moviedirector";;

		"api-route-movie" )
			test_wait_postgresql "route-movie";;

		"api-service-moviecategory" )
			test_wait_postgresql "service-moviecategory" ;;

		"api-service-moviedirector" )
			test_wait_postgresql "service-moviedirector" ;;

		"api-service-movie" )
			test_wait_postgresql "service-movie" ;;

		"api-service-moviedependmoviecategory" )
			test_wait_postgresql "service-moviedependmoviecategory" ;;

		"api-service-moviedependmoviedirector" )
			test_wait_postgresql "service-moviedependmoviedirector" ;;

		"api-service-useraccount" )
			test_wait_postgresql "service-useraccount" ;;

		"api-route-moviedependmoviecategory" )
			test_wait_postgresql "route-moviedependmoviecategory";;

		* )
			print_list ;;
	esac
else
	print_list
fi
