import { useFocusEffect, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, TextInput, Image, Dimensions, FlatList, ActivityIndicator } from "react-native";
import { useAsyncStorage } from "../../hooks/use-async-storage";
import { useCallback, useState } from "react";
import { useGetRecipes, RecipeSearchResult } from "../../hooks/use-get-posts";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (WINDOW_WIDTH - 44) / 2;

const CATEGORIES = ['All', 'Food', 'Drink'] as const;
const TYPE_PUBLICATION = ['Recommandation', 'Perso'] as const;


function RecipeCard({ item, onPress }: { item: RecipeSearchResult; onPress: () => void }) {
  const [liked, setLiked] = useState(false);
  const initial = item.recipe_name?.[0]?.toUpperCase() ?? '?';

  return (
    <TouchableOpacity style={{ width: CARD_WIDTH, marginBottom: 20 }} onPress={onPress} activeOpacity={0.85}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
        <View style={{
          width: 30, height: 30, borderRadius: 11,
          backgroundColor: '#D4BFB0',
          justifyContent: 'center', alignItems: 'center',
        }}>
          <Text style={{ fontSize: 13, color: '#6E473B', fontWeight: '700' }}>{initial}</Text>
        </View>
        <Text style={{ fontSize: 13, color: '#291C0E', fontWeight: '500', flex: 1 }} numberOfLines={1}>
          {item.recipe_name?.split(' ')[0] ?? 'Recipe'}
        </Text>
      </View>

      <View>
        <Image
          style={{ width: '100%', height: 145, borderRadius: 14 }}
          source={item.recipe_image ? { uri: item.recipe_image } : require('../../../assets/picture_01.png')}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => setLiked(l => !l)}
          style={{
            position: 'absolute', top: 8, right: 8,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: 8, width: 32, height: 32,
            justifyContent: 'center', alignItems: 'center',
          }}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Text style={{ fontSize: 15, color: liked ? '#C0392B' : '#888' }}>{liked ? 
          <Image source={require('../../../assets/icons/heart_filled.png')} style={{ width: 15, height: 15 }} />
          : 
          <Image source={require('../../../assets/icons/heart_outline.png')} style={{ width: 15, height: 15 }} />
          }</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: '#291C0E', fontSize: 15, fontWeight: '700', marginTop: 8 }} numberOfLines={1}>
        {item.recipe_name}
      </Text>
      <Text style={{ color: '#9B8B7E', fontSize: 12, marginTop: 2 }} numberOfLines={1}>
        Food{item.recipe_description ? '  •  ' + item.recipe_description.split(' ').slice(0, 3).join(' ') : ''}
      </Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { data: recipes, isLoading, isError, error } = useGetRecipes();
  const [onboardingCompleted, , onboardingCompletedLoading] = useAsyncStorage("onboardingCompleted", false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All');
  const [activeType, setActiveType] = useState<typeof TYPE_PUBLICATION[number]>('Recommandation');

  useFocusEffect(
    useCallback(() => {
      if (!onboardingCompleted && !onboardingCompletedLoading) {
        router.replace("/onboarding");
      }
    }, [onboardingCompleted, onboardingCompletedLoading]),
  );

  const header = (
    <View style={{ paddingTop: 56, paddingHorizontal: 16, paddingBottom: 4 }}>
      <Text style={{ fontSize: 26, fontWeight: '700', color: '#291C0E', marginBottom: 18 }}>
        Home
      </Text>

      <View style={{
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#ffffff', borderRadius: 28,
        paddingHorizontal: 16, paddingVertical: 11, marginBottom: 24,
      }}>
        <Image
          source={require(".././../../assets/icons/search.png")}
          style={{ width: 18, height: 18, marginRight: 8 }}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9B8B7E"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          style={{ flex: 1, fontSize: 15, color: '#291C0E' }}
        />
      </View>

      <Text style={{ fontSize: 16, fontWeight: '700', color: '#291C0E', marginBottom: 12 }}>
        Category
      </Text>
      <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24, marginHorizontal: 8 }}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={{
              flex: 1, alignItems: 'center', paddingVertical: 9,
              borderRadius: 22,
              backgroundColor: activeCategory === cat ? '#6E473B' : '#E8E0D6',
            }}
          >
            <Text style={{
              color: activeCategory === cat ? '#FFFFFF' : '#6E473B',
              fontWeight: '600', fontSize: 14,
            }}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 8, backgroundColor: '#f1f1f1', marginHorizontal: -16, marginBottom: 20 }} />

      <View style={{ flexDirection: 'row', gap: 28, marginBottom: 20 }}>
        {TYPE_PUBLICATION.map(type => (
          <TouchableOpacity key={type} onPress={() => setActiveType(type)}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: activeType === type ? '#291C0E' : '#B0A49A' }}>
              {type}
            </Text>
            {activeType === type && (
              <View style={{ height: 2, backgroundColor: '#6E473B', marginTop: 5, borderRadius: 1 }} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {isLoading && <ActivityIndicator size="large" color="#6E473B" style={{ marginVertical: 32 }} />}
      {isError && (
        <Text style={{ color: '#C0392B', marginVertical: 12, fontSize: 13 }}>
          Erreur : {error?.message ?? 'inconnue'}
        </Text>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
      <FlatList
        data={isLoading ? [] : (recipes ?? [])}
        keyExtractor={(item) => item.recipe_id}
        renderItem={({ item }) => (
          <RecipeCard item={item} onPress={() => router.push(`/details/${item.recipe_id}`)} />
        )}
        numColumns={2}
        ListHeaderComponent={header}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
