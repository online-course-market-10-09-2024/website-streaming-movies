package libs

import (
	"errors"
	"time"
)

func CheckValidDate(input string) error {
	const layout = "2006-01-02"

	// Parse the input string using the layout.
	_, err := time.Parse(layout, input)
	if err != nil {
		return errors.New("invalid date format, expected YYYY-MM-DD!")
	}

	return nil
}