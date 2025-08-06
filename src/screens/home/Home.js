
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Dimensions 
} from 'react-native';
import { useNavigate } from 'react-router-dom';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigate = useNavigate();
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          {/* Logo placeholder - puedes reemplazar con tu imagen */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>🌺</Text>
          </View>
          
          <Text style={styles.mainTitle}>Vive</Text>
          <Text style={styles.subTitle}>el Quechua</Text>
          
          {/* Colorful dots decoration */}
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, { backgroundColor: '#FF6B6B' }]} />
            <View style={[styles.dot, { backgroundColor: '#4ECDC4' }]} />
            <View style={[styles.dot, { backgroundColor: '#45B7D1' }]} />
            <View style={[styles.dot, { backgroundColor: '#FFA07A' }]} />
            <View style={[styles.dot, { backgroundColor: '#98D8C8' }]} />
          </View>
        </View>

        <TouchableOpacity style={styles.ingressButton} onPress={() => navigate('/webcom')}>
          <Text style={styles.ingressButtonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.educationText}>Educación de Quechua</Text>
        
        {/* Social Media Icons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>📷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>✉️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>📱</Text>
          </TouchableOpacity>
        </View>

        {/* Acerca de button */}
        <TouchableOpacity style={styles.aboutButton}>
          <Text style={styles.aboutButtonText}>Acerca de</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A4B73', // Purple gradient background
  },
  headerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    minHeight: height * 0.7,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
    color: 'white',
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'serif',
    marginBottom: -5,
  },
  subTitle: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'serif',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  ingressButton: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ingressButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomSection: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    minHeight: height * 0.3,
  },
  educationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  socialIcon: {
    fontSize: 18,
    color: '#666',
  },
  aboutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#2C3E50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  aboutButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Home;
