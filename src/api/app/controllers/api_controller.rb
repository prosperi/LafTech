# Main class for the application, handles all requests for data
class ApiController < ApplicationController

  # Returns the list of countines available in the database as a json object
  def list_counties
    @counties = School.select('county').group('county').all().pluck('county')

    json_response(@counties)
  end

  # Returns the list of schools, along with some summary information, as a json
  # object
  def list_schools
    @schools = School.joins(:Fact)
    .where(school: {county: params[:county_id]})
    .select('data_school_facts.school_add_city,
             data_school_facts.school_enrollment,
             data_school_facts.grades_offered,
             data_school_facts.dropout_rate,
             data_school_facts.sat_math,
             data_school_facts.sat_reading,
             data_school_facts.sat_writing,
             data_school_facts.website,
             data_school_facts.school_add_city,
             school.school_name,
             school.latitude,
             school.longitude,
             school.state_lea_id
            ')
            .uniq

    json_response(@schools)
  end

  # Returns a list of schools given an input parameter as a json object.
  # This is used in the search-box on the main page.
  def search_schools
    @schools = School.where('school_name LIKE UPPER(?) AND county IS NOT NULL',
      "%#{params[:query]}%").uniq

    json_response(@schools)
  end

  # Given a school's state_lea_id, returns summary information as a json object
  def school_details
    @schools = School.joins(:Fact)
    .where('school.state_lea_id = ?', params[:school_id])
    .select('data_school_facts.school_add_city,
             data_school_facts.school_enrollment,
             data_school_facts.grades_offered,
             data_school_facts.male,
             data_school_facts.female,
             data_school_facts.dropout_rate,
             data_school_facts.website,
             data_school_facts.school_add_city,
             data_school_facts.telephone_no,
             school.school_name,
             school.county,
             school.latitude,
             school.longitude,
             school.state_lea_id,
             school.lea_type
            ')
    .first

    json_response(@schools)
  end

  # Returns the pupil expenditure and pssa proficiency percentages summary information
  # for visualization_1 as a json object.
  def visualization_1
    @pssa_information = School.joins(:Fiscal, :Performance_Measure)
            .select('
              pupil_expenditure_total,
              school.state_lea_id,
              school_name,
              math_algebra_percent_proficient,
              reading_lit_percent_proficient_pssa,
              scibio_percent_proficient_pssa
            ')
            .where.not(data_school_fiscal: { pupil_expenditure_total: nil})
            .where.not(data_school_performance_measure: { math_algebra_percent_proficient: nil })
            .where.not(data_school_performance_measure: { reading_lit_percent_proficient_pssa: nil })
            .where.not(data_school_performance_measure: { scibio_percent_proficient_pssa: nil })
            .order('pupil_expenditure_total ASC')
            .all()

  json_response(@pssa_information)
  end

  # Returns the the average pssas performances for each lea_type, for
  # visualization_2 as a json object.
  def visualization_2
    @pssa_performance_information = Exam.joins(:School)
              .select('
                subject,
                lea_type,
                AVG(pctadvanced) AS avgpctadvanced,
                AVG(pctproficient) AS avgpctproficient,
                AVG(pctbasic) AS avgpctbasic,
                AVG(pctbelowbasic) AS avgpctbelowbasic
              ')
              .where.not(data_exam: { pctadvanced: nil })
              .where.not(data_exam: { pctproficient: nil })
              .where.not(data_exam: { pctbasic: nil })
              .where.not(data_exam: { pctbelowbasic: nil })
              .where(data_exam: { student_group: "All Students" })
              .where(data_exam: { source: ["pssa"] })
              .where(data_exam: { grade: params[:grade] })
              .where(data_exam: { academic_year_start: params[:academic_year_start] })
              .group("lea_type")
              .group("subject")

    json_response(@pssa_performance_information)
  end

  # Returns the average sat scores and total revenues for each school, for
  # visualization_3 as a json object.
  def visualization_3
    @fiscal_information = School.joins(:Fiscal, :Fact)
              .select('
                school_name,
                (sat_math + sat_reading + sat_writing) AS sat_total,
                (local_revenue + state_revenue + other_revenue + fed_revenue) AS totalRevenue
              ')
              .where.not(data_school_facts: { sat_math: nil })
              .where.not(data_school_facts: { sat_reading: nil })
              .where.not(data_school_facts: { sat_writing: nil })
              .order('totalRevenue ASC')
              .all()

    json_response(visualization_3_custom_json(@fiscal_information))
  end

  def visualization_3_custom_json(data)
    @dataResult = data.map do |tuple|
      {
        :schoolName => tuple.school_name, :totalRevenue => tuple.totalrevenue,
        :sat_math => tuple.sat_math, :sat_reading => tuple.sat_reading,
        :sat_writing => tuple.sat_writing
      }
    end

    @dataResult.as_json
  end
end
