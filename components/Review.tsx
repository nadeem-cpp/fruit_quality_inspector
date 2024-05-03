import {  StyleSheet, View, Text } from "react-native";
import Star from "./icons/Star";

type ItemType = {
    stars: number,
    comment: string,
    author: string
};
const Review = ({ stars, comment, author }: ItemType) => {
    const renderStar = () => {
        const count = () => { if (stars <= 5 && stars >= 0) { return stars } return 0 }
        const star = [];
        for (let i = 0; i < stars; i++) {
            star.push(<Star key={i} />)
        }
        return star;
    }
    return (
        <View style={styles.card}>
            <View style={styles.rating}>
                {renderStar()}
            </View>
            <Text style={[styles.comment, styles.textColor]} numberOfLines={3}>
                {comment}
            </Text>
            <Text style={[styles.author, styles.textColor]}>~{author}</Text>
        </View>

    )

}

const cardHeight = 120;
const styles = StyleSheet.create({
    card: {
        width: 250,
        marginVertical: 13,
        marginEnd: 13,
        padding: 10,
        minHeight: cardHeight,
        backgroundColor: 'rgba(200, 223, 239, 0.4)',
        borderRadius: 8,
    },
    textColor: {
        color: "white"
    },
    title: {
        fontSize: 22,
        fontWeight: '400',
    },
    rating: {
        flexDirection: "row"
    },
    comment: {
        fontSize: 12,
    },
    author: {
        fontStyle: "italic"
    }
})

export default Review;