LOG_FILE="aidatasetgen.log"

# Run the script 100 times
for i in {1..1000}; do
    echo "Run #$i" >> $LOG_FILE
    python aidatasetgen.py >> $LOG_FILE 2>&1
    echo "Completed Run #$i" >> $LOG_FILE
done