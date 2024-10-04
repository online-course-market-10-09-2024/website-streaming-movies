FROM golang:1.22.7-alpine

WORKDIR /api-chi

# Copy package files and download
COPY api-chi/go.mod api-chi/go.sum ./
RUN go mod download

# Copy source code
COPY api-chi/main.go ./

# Build and run
RUN go build .
ENTRYPOINT ["./api-chi"]