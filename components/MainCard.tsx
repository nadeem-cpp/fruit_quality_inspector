import { StyleSheet, View, Text } from "react-native";
import CircularProgress from "./CircularProgress";
function MainCard()
{
    return (
        <View style={styles.testimonial}>
            <View>
                <CircularProgress percentage={70} color="#007bff"/>
                <Text>Model Accuracy</Text>
            </View>
            <View>
                <CircularProgress percentage={50} color="#2EAD3D"/>
                <Text>Positive Ratings</Text>
            </View>
            <View>
                <CircularProgress percentage={45} color="#C93636"/>
                <Text>Negative Ratings</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    testimonial: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 200,
        borderRadius: 12,
        backgroundColor: 'rgba(200, 223, 239, 0.5)',
      },
});

export default MainCard;